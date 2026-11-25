# Como regenerar a apresentação

Código-fonte do deck `../bullying-saude-mental-escola.pptx`.

- `build-bullying.js`: monta os 13 slides e o roteiro de fala, recortando as imagens de `../imagens/` (cenas escolares 3D enviadas pelo usuário).
- `assets/`: logos recortadas.
- `kit.js`: objetos em SVG de uma versão anterior (não usado nesta versão).

Os recortes evitam a plaquinha da logo que vem dentro das imagens (canto superior direito); a logo é colocada pequena no canto inferior esquerdo.

```bash
npm install pptxgenjs react react-dom react-icons sharp
NODE_PATH=./node_modules node build-bullying.js saida.pptx roteiro.md
```

O script usa o módulo `apply_theme.js` da skill `pptx` (caminho fixo no topo do arquivo); ajuste se o caminho mudar.
