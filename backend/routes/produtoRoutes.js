// routes/produtoRoutes.js
const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const multer = require('multer');

// --- Configuração do Multer (específica para estas rotas) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // O caminho é relativo à raiz do projeto
        cb(null, 'public/uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Define as rotas e associa-as às funções do controller
// O middleware 'upload.single('imagem')' é usado apenas na rota de criação (POST)
router.post('/', upload.single('imagem'), produtoController.createProduto);
router.get('/', produtoController.getAllProdutos);

module.exports = router;
