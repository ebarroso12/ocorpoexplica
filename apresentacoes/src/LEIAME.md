# Como regenerar a apresentação

Código-fonte do deck `../bullying-saude-mental-escola.pptx`.

- `build-bullying.js`: monta os 13 slides (painel de texto + imagem grande) e o roteiro de fala.
- `../imagens/ia/`: 15 imagens super-realistas geradas por IA (Figma), sem pessoas, uma por slide.
- `../imagens/referencia/`: as cenas 3D de referência enviadas pelo usuário (não usadas na versão atual).
- `assets/`: logos recortadas.

```bash
npm install pptxgenjs react react-dom react-icons sharp
NODE_PATH=./node_modules node build-bullying.js saida.pptx roteiro.md
```

O script usa o módulo `apply_theme.js` da skill `pptx` (caminho fixo no topo do arquivo); ajuste se o caminho mudar.
