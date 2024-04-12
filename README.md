# Documentação do Projeto Weather App

Este projeto envolve a criação de um tema WordPress personalizado usando Sage 10, projetado para exibir previsões meteorológicas com base na localização do usuário. Os usuários também podem pesquisar previsões meteorológicas para outras localidades ao redor do mundo.

## Etapa 1 - Preparação e Desenvolvimento Local

### Objetivos
- Instalar Docker e Docker Compose na máquina local.
- Criar o ambiente de desenvolvimento local.
- Instalar e configurar o tema Sage 10.

### Procedimentos
1. Instalação do Docker e Docker Compose na máquina local.
2. Criação de um diretório para o projeto.
3. Construção do arquivo `docker-compose.yml` com duas imagens: `wordpress` e `mariadb`.
4. Verificação dos arquivos e instalação do WordPress via localhost.
5. Instalação do Sage 10 e suas dependências (Yarn, Node, Composer).
6. Configurações de preparação para o tema.
7. Construção do arquivo de template e do script necessário.
8. Criação de um arquivo `proxy.php` para atuar como intermediário nas requisições a uma das APIs utilizadas.
9. Build do tema e realização de testes práticos no ambiente local, seguido de correção de bugs.
10. Definição do template criado como o tema principal do site.
11. Configuração da página em que o template foi aplicado como a página inicial do site.

## Etapa 2 - Configuração do Servidor

### Objetivos
- Preparar a infraestrutura na nuvem.
- Configurar o domínio e SSL.

### Procedimentos
1. Criação de uma instância EC2.
2. Armazenamento da chave na máquina local.
3. Edição das regras de entrada do grupo de segurança para autorizar tráfego nas portas usadas.
4. Aquisição de um domínio público e registro no Cloudflare.
5. Registro do IP público da instância EC2 e do CNAME no Cloudflare.
6. Atualização dos nameservers no registrador de domínio com os fornecidos pelo Cloudflare.

## Etapa 3 - Implantação

### Objetivos
- Configurar o ambiente de produção.
- Instalar e configurar o WordPress no servidor.

### Procedimentos
1. Conexão com a instância EC2.
2. Instalação do Docker e Docker Compose na instância.
3. Criação de um diretório no servidor e configuração do `docker-compose.yml`.
4. Verificação dos arquivos.
5. Instalação e configuração do servidor web (Apache).
6. Criação e configuração do certificado Cloudflare CA.
7. Configuração do servidor web para usar Proxy(HTTPS) e SSL/TLS.
8. Mudança do modo de segurança de Flexível para Completo (Estrito) no Cloudflare.
9. Instalação do WordPress via domínio configurado.

## Etapa 4 - Deploy e CI/CD

### Objetivos
- Configurar a integração contínua para o tema.
- Automatizar o processo de deploy.

### Procedimentos
1. Criação de um repositório no GitHub para o projeto.
2. Criação de uma pasta `.github/workflows` com um arquivo `main.yml` no tema.
3. Configuração da GitHub Action para realizar a conectividade com a instância EC2 e atualizar as alterações no tema automaticamente via branch `main`.
4. Criação das secrets necessárias no painel de configurações do repositório no GitHub.
5. Execução do deploy do projeto.
