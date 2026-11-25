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
- Estilo aprovado pelo usuário: slides **limpos, vivos e com imagem GRANDE** (mais da metade do slide). Layout padrão: painel de texto branco ou azul-marinho à esquerda (título em 2 linhas, uma frase de mensagem, 4 itens curtos) e imagem em altura total à direita; abertura com imagem em tela cheia e escurecimento azul-marinho só atrás do texto. Sem caixas, linhas divisórias ou faixas. Títulos em serifa (Cambria), texto em Calibri; **logo pequena no canto inferior esquerdo**.
- Imagens: **cenas escolares 3D renderizadas, coloridas e acolhedoras, SEM pessoas** (luz quente dourada, plantas, cadeiras, mochila, cadernos, portas abertas; paleta azul-marinho, coral, turquesa, amarelo, lavanda). As 5 imagens de referência do usuário estão em `apresentacoes/imagens/` e podem ser recortadas de várias formas; as imagens têm uma plaquinha de logo no canto superior direito, então **recortar fora dessa área**. Mais pedidos de imagem em `apresentacoes/prompts-imagens.md`. Não usar fotos de pessoas, figuras desenhadas nem ícones tipo emoji (rejeitados).
- Imagens enviadas pelo usuário só viram arquivo se vierem numa mensagem nova, não durante o trabalho do Claude.
- Instagram: `@dredsonbarroso`.
- Não usar o Gamma (o usuário não quer) nem ícones genéricos em círculos como visual principal.
