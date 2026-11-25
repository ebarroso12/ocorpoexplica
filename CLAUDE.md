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
