const Aplicacion = require('../models/Aplicacion');

// Crear una nueva aplicación
exports.createAplicacion = async (req, res) => {
  try {
    const { name, url, isActive } = req.body;
    const nuevaAplicacion = new Aplicacion({ name, url, isActive });
    await nuevaAplicacion.save();
    res.status(201).json(nuevaAplicacion);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la aplicación', error: err.message });
  }
};

// Obtener todas las aplicaciones
exports.getAplicaciones = async (req, res) => {
  try {
    const aplicaciones = await Aplicacion.find();
    res.json(aplicaciones);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener aplicaciones', error: err.message });
  }
};

// Obtener una aplicación por ID
exports.getAplicacionById = async (req, res) => {
  try {
    const aplicacion = await Aplicacion.findById(req.params.id);
    if (!aplicacion) return res.status(404).json({ message: 'Aplicación no encontrada' });
    res.json(aplicacion);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener la aplicación', error: err.message });
  }
};

// Actualizar una aplicación
exports.updateAplicacion = async (req, res) => {
  try {
    const { name, url, isActive } = req.body;
    const aplicacion = await Aplicacion.findByIdAndUpdate(
      req.params.id,
      { name, url, isActive },
      { new: true }
    );
    if (!aplicacion) return res.status(404).json({ message: 'Aplicación no encontrada' });
    res.json(aplicacion);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la aplicación', error: err.message });
  }
};

// Eliminar una aplicación
exports.deleteAplicacion = async (req, res) => {
  try {
    const aplicacion = await Aplicacion.findByIdAndDelete(req.params.id);
    if (!aplicacion) return res.status(404).json({ message: 'Aplicación no encontrada' });
    res.json({ message: 'Aplicación eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la aplicación', error: err.message });
  }
};
