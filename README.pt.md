# Gerenciador de Tarefas (Acessível & Responsivo)

Este é um aplicativo web simples e acessível de gerenciamento de tarefas com os seguintes recursos (agora usando uma paleta de cores clara):

- Adicionar tarefas
- Marcar tarefas como concluídas
- Excluir tarefas
- Persistência em LocalStorage
- Atalhos de teclado + atualizações ao vivo acessíveis
- Layout responsivo e estilo moderno
 - Filtragem: mostrar Todas / Ativas / Concluídas
 - Tema: Claro (padrão). A interface usa uma paleta clara para melhor legibilidade em ambientes iluminados.

## Arquivos

- `index.html` — marcação semântica e estrutura
- `styles.css` — estilos CSS modernos e responsivos
- `script.js` — lógica do app, persistência e comportamentos de acessibilidade

## Executar localmente

Abra `index.html` em um navegador. Nenhum servidor é necessário. Para desenvolvimento, você também pode servir com um servidor estático simples; por exemplo, usando Python:

```bash
python3 -m http.server 8000
# depois abra http://localhost:8000 no navegador
```

## Acessibilidade & Atalhos de teclado

- Rótulos adequados e estados de foco estão incluídos.
- Uma região `aria-live` anuncia mudanças (tarefa adicionada, concluída, excluída).
- Pressione `N` ou `/` para focar rapidamente o campo Adicionar Tarefa.
- Use `Tab` e `Shift+Tab` para navegar pelos elementos interativos.
- Pressione `Enter` ou `Space` no rótulo de uma tarefa para alternar sua conclusão (a checkbox também pode ser usada).
 - Pressione `N` ou `/` para focar rapidamente o campo Adicionar Tarefa.
 - Use `Tab` e `Shift+Tab` para navegar pelos elementos interativos. Use Enter/Espaço para ativar botões.
 - Os botões de filtro (Todas / Ativas / Concluídas) são focáveis e podem ser ativados via teclado.

## Notas

- As tarefas persistem em `localStorage` usando a chave `task-manager:tasks:v1`.
 - As tarefas persistem em `localStorage` usando a chave `task-manager:tasks:v1`.
 - O filtro selecionado persiste usando `task-manager:filter:v1`.
- É simples por design — sinta-se livre para expandir com edição, ordenação, mais filtros ou importação/exportação.

## Licença

Open-source e gratuito para uso.

## Autor

Criado por Oscar.

## Agradecimentos

Inspirado por vários aplicativos de gerenciamento de tarefas e boas práticas de acessibilidade.
