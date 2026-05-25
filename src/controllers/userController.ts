import { userService } from '@/services'
import { Request, Response } from 'express'


const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.getUsers()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' })
    }
}

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.getUserById(req.params.id as string)
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' })
            return
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' })
    }
}

const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.getUserByEmail(req.params.email as string)
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' })
            return
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' })
    }
}


const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.createUser(req.body)
        res.status(201).json(user)
    } catch (error: any) {
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'El email o username ya existe' })
            return
        }
        res.status(500).json({ error: 'Error al crear el usuario' })
    }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.updateUser(req.params.id as string, req.body)
        res.json(user)
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Usuario no encontrado' })
            return
        }
        res.status(500).json({ error: 'Error al actualizar el usuario' })
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        await userService.deleteUser(req.params.id as string)
        res.status(204).send()
    } catch (error: any) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'Usuario no encontrado' })
            return
        }
        res.status(500).json({ error: 'Error al eliminar el usuario' })
    }
}

export const userController = { getUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser }