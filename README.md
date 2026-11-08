# Gomes Torneadora

Site estático responsivo, preparado para GitHub Pages no caminho `/gomestorneadora/`. Sem dependências de build.

## Publicação

Envie os arquivos para a branch `main` do repositório `coreilabs/gomestorneadora`. Em Settings → Pages, selecione GitHub Actions. O workflow incluído publica somente arquivos públicos. Como alternativa, selecione Deploy from a branch, branch principal, pasta `/ (root)`, e remova o workflow para evitar duas formas de publicação. URL padrão: https://coreilabs.github.io/gomestorneadora/ (GitHub Pages usa github.io, não github.com).

Antes da divulgação, substituir o telefone fictício em `COMPANY` no app.js, definir `provisional: false` e atualizar o aviso/número visível em index.html. O horário provisório é segunda a sexta, 08h–18h. Não há endereço cadastrado.

Depois de qualquer edição de JS/CSS, executar `node tools/version-assets.mjs`. O helper gera tokens hexadecimais aleatórios por recurso e atualiza referências e cache offline em conjunto. Publicar index.html, app.js, styles.css e sw.js juntos. Novos recursos devem entrar no helper. Para trocar a imagem social, renovar o token nas três tags de imagem, preservando URLs absolutas.

PWA: requer HTTPS (ou localhost para desenvolvimento). O botão de instalação aparece quando o navegador oferece o evento; no iOS, usar o menu Compartilhar. Cache local inclui conteúdo principal e imagens; fontes externas possuem fallback de sistema. Novas versões do service worker assumem após encerrar as abas antigas. Atualizações de HTML e URLs não atualizam automaticamente abas abertas ou prévias sociais existentes.

Para visualizar: `python -m http.server 8088 --bind 127.0.0.1`, depois abrir http://127.0.0.1:8088/.
