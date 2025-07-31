const express = require('express');
const router = express.Router();
const aplicacionController = require('../controllers/aplicacionController');

/**
 * @swagger
 * tags:
 *   name: Aplicaciones
 *   description: CRUD de aplicaciones
 */

/**
 * @swagger
 * /aplicaciones:
 *   post:
 *     summary: Crear una nueva aplicación
 *     tags: [Aplicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - url
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Aplicación creada
 *       500:
 *         description: Error al crear la aplicación
 */
router.post('/', aplicacionController.createAplicacion);

/**
 * @swagger
 * /aplicaciones:
 *   get:
 *     summary: Obtener todas las aplicaciones
 *     tags: [Aplicaciones]
 *     responses:
 *       200:
 *         description: Lista de aplicaciones
 *       500:
 *         description: Error al obtener aplicaciones
 */
router.get('/', aplicacionController.getAplicaciones);

/**
 * @swagger
 * /aplicaciones/{id}:
 *   get:
 *     summary: Obtener una aplicación por ID
 *     tags: [Aplicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la aplicación
 *     responses:
 *       200:
 *         description: Aplicación encontrada
 *       404:
 *         description: Aplicación no encontrada
 *       500:
 *         description: Error al obtener la aplicación
 */
router.get('/:id', aplicacionController.getAplicacionById);

/**
 * @swagger
 * /aplicaciones/{id}:
 *   put:
 *     summary: Actualizar una aplicación
 *     tags: [Aplicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la aplicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Aplicación actualizada
 *       404:
 *         description: Aplicación no encontrada
 *       500:
 *         description: Error al actualizar la aplicación
 */
router.put('/:id', aplicacionController.updateAplicacion);

/**
 * @swagger
 * /aplicaciones/{id}:
 *   delete:
 *     summary: Eliminar una aplicación
 *     tags: [Aplicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la aplicación
 *     responses:
 *       200:
 *         description: Aplicación eliminada
 *       404:
 *         description: Aplicación no encontrada
 *       500:
 *         description: Error al eliminar la aplicación
 */
router.delete('/:id', aplicacionController.deleteAplicacion);

module.exports = router;
