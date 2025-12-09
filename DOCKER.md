# Docker - Instruções

## 🐳 Como usar

### Opção 1: Docker Compose (Recomendado)

```bash
# Subir a aplicação
docker-compose up

# Subir em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar a aplicação
docker-compose down
```

### Opção 2: Docker direto

```bash
# Build da imagem
docker build -t mre-frontend .

# Rodar o container
docker run -p 3001:3001 -e PORT=3001 mre-frontend
```

## 🌐 Acessar a aplicação

Após subir o container, acesse:
- **http://localhost:3001**

## 🛑 Parar e remover

```bash
# Parar e remover containers
docker-compose down

# Parar, remover e limpar volumes
docker-compose down -v
```

## 📝 Notas

- A aplicação roda na porta **3001**
- O build pode demorar alguns minutos na primeira vez
- Os arquivos em `.dockerignore` não são copiados para o container

