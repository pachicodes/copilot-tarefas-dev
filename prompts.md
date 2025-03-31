# Workshop: Construindo um Gerenciador de Tarefas com GitHub Copilot - Prompts

Vamos melhorar este aplicativo usando o GitHub Copilot. Queremos implementar o seguinte:

## Gerenciamento Básico de Tarefas:
- Adicionar funcionalidade de edição de tarefas
- Permitir que usuários vejam suas tarefas concluídas

## Melhorias na Qualidade do Código:
- Refatorar o método `renderTask` para melhor legibilidade (destaque a função no `script.js` e peça ao Copilot para refatorar)
- Adicionar validação de entrada ao método `addTask` (destaque a função no `script.js` e peça ao Copilot para adicionar validação de entrada)
- Atualizar o código para usar constantes em vez de strings mágicas (atualizar seletores hard coded, etc.)
- Abrir `script.js` e o Copilot Chat, digitar `/test` para gerar testes unitários para a classe `TaskManager`
- Fazer perguntas ao Copilot:
    - "Há algo neste arquivo que pode ser refatorado?" (abrir o arquivo `script.js` - modo Chat)
    - "E quanto a otimizações de desempenho?" (abrir o arquivo `script.js` - modo Chat)

## Documentação:
- Atualizar o README deste projeto (anexar todos os arquivos relevantes ao prompt)
- Adicionar imagem ao README (abrir chat inline e adicionar imagem [link](https://github.com/user-attachments/assets/6cde8c43-9510-470e-91c6-6c505f4150e3))

## Revisão de Código no Editor:
- Destacar uma parte do código, clicar no ícone de brilho que aparece e selecionar "Revisar usando Copilot" (isso gerará um comentário de revisão de código)

## Recursos Extras:
- Me ajude a implementar um temporizador Pomodoro para ajudar os usuários a manter o foco com opções de 15/5, 30/10, 60/20 e personalizadas
- Criar uma forma de categorizar tarefas com tags personalizadas
- Adicionar um filtro para visualizar tarefas por categoria
- Adicionar um recurso para exportar tarefas como CSV
