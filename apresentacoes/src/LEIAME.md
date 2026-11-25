# Como regenerar a apresentação

Código-fonte do deck `../bullying-saude-mental-escola.pptx`.

- `kit.js`: conjunto de objetos em estilo 3D suave (SVG), sem pessoas, nas cores da marca. Reutilizável em outros decks.
- `build-bullying.js`: monta os 13 slides e o roteiro de fala.
- `assets/`: logos recortadas.

```bash
npm install pptxgenjs react react-dom react-icons sharp
NODE_PATH=./node_modules node build-bullying.js saida.pptx roteiro.md
```

O script usa o módulo `apply_theme.js` da skill `pptx` (caminho fixo no topo do arquivo); ajuste se o caminho mudar.
