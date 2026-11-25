# Projeto: Apresentações

Este repositório é um projeto para **criar apresentações** (slides), principalmente para uso em escola.

## Regras do projeto

- Idioma padrão: **português do Brasil**, a menos que o usuário peça outro.
- Sempre que for criar ou revisar slides, decks ou apresentações, use a skill **`slide-design`**
  (`.claude/skills/slide-design/SKILL.md`): um ponto por slide, pouco texto, mais imagem,
  poucas cores e fontes, e o checklist de 6 perguntas antes de entregar cada slide.
- Antes de montar o deck, confirme: tema, turma/faixa etária, duração e formato
  (PowerPoint, HTML ou PDF).
- Para público escolar: linguagem simples, frases curtas, texto grande e legível de longe.
- Salve as apresentações geradas em `apresentacoes/` (um arquivo ou pasta por tema).

## Skills instaladas

| Skill | Origem | Uso |
|---|---|---|
| `slide-design` | https://github.com/hunkim/slide-skill | Regras de design de slides legíveis |

Para atualizar a skill, baixe a versão nova do repositório de origem e substitua a pasta
`.claude/skills/slide-design/` (sem copiar o `.git`).

## Identidade visual (Dr. Edson Barroso · Saúde Mental Adulto e Infantil)

- Use **sempre a logomarca** em apresentações. Arquivos em `apresentacoes/logo/`:
  - `logo-horizontal-colorida.png` e `logo-vertical-colorida.png`: para fundo claro.
  - `logo-horizontal-fundo-escuro.png` e `logo-vertical-fundo-escuro.png`: para fundo escuro (monograma dourado + texto branco).
  - `logo-horizontal-branca.png`: versão toda branca.
- Paleta da marca: azul-marinho `#0B172B`, dourado `#A67C52`, dourado médio `#C4A07A`, champagne `#E3CFB3`, fundo suave `#F4EDE3`.
- Estilo: moderno, vivo e impactante; títulos em serifa (Cambria), texto em Calibri; **fotos reais, atuais e coloridas** (Adobe Stock, coleção gratuita, via conector Adobe) em todos os slides; logo **pequena no canto inferior esquerdo**; abertura e fechamento com foto em tela cheia e escurecimento azul-marinho para o texto.
- Não usar figuras/ilustrações desenhadas simples: o usuário rejeitou.
- Imagens: buscar com termos curtos em inglês (consultas longas voltam vazias), filtro `pricing: free`, licenciar com `asset_license_and_download_stock` e baixar o link S3 com `curl`.
- Instagram: `@dredsonbarroso`.
- Não usar o Gamma (o usuário não quer) nem ícones genéricos em círculos como visual principal.
