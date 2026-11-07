# Guia de Hospedagem — Deploy de sites na infraestrutura da UFPA (CTIC)

Este guia ensina, do zero, como publicar (ou atualizar) **qualquer site estático** (gerado por Vite, Next.js export, Create React App, ou até HTML puro) nos servidores do Data Center da UFPA. Foi escrito para quem **nunca fez isso antes** — siga na ordem, sem pular etapas.

Ele não é específico de um projeto: sirva-se dele para qualquer site que a UFPA hospede para o seu laboratório, departamento ou grupo de pesquisa.

> **Antes de começar:** este documento **não contém senhas nem chaves reais** de propósito (segurança — veja [Onde guardar suas credenciais](#onde-guardar-suas-credenciais-com-segurança)). Você vai precisar ter em mãos os documentos que o CTIC da UFPA te enviou para o seu site específico.

---

## Como isso funciona (visão geral)

O site **não roda no seu computador**. Ele é hospedado nos servidores do Data Center da UFPA. Seu papel como administrador é:

1. Gerar os arquivos finais do site no seu computador (o comando de build do seu projeto)
2. Enviar esses arquivos para o servidor da UFPA via **FTP**
3. O FTP da UFPA só aceita conexões vindas de dentro de uma **VPN** — por isso você precisa estar conectado a ela toda vez que for enviar arquivos

Depois que os arquivos chegam no servidor, ele fica no ar sozinho — não depende do seu PC estar ligado.

```
Seu computador                    VPN da UFPA                Servidor UFPA
┌─────────────────┐              (túnel seguro)         ┌──────────────────┐
│ comando de build │──────────────────────────────────▶ │ SEUSITE.ufpa.br   │
│ (gera pasta de   │         FTP (usuário/senha)         │                   │
│  saída do build) │                                     │                   │
└─────────────────┘                                      └──────────────────┘
                                                                    │
                                                          site fica no ar 24/7
                                                          mesmo com seu PC desligado
```

---

## O que você precisa ter em mãos

Todos esses dados vêm de dois lugares: o **chamado no Sagitta** (sistema de tickets da UFPA) e o **documento de credenciais** que o CTIC envia por e-mail depois de configurar o acesso ao site.

| Informação | Onde encontrar | Usada para |
|---|---|---|
| Gateway Remoto da VPN (ex: `vpn.dmz.ufpa.br`) | E-mail do chamado Sagitta | Configurar a VPN |
| PSK (chave pré-compartilhada) | E-mail do chamado Sagitta | Configurar a VPN |
| Local ID | E-mail do chamado Sagitta | Configurar a VPN |
| Seu usuário/senha institucional UFPA (`nome@campus.ufpa.br`) | Sua conta pessoal (e-mail/SIGAA) | Login na VPN |
| Host do FTP | Documento de credenciais do site | Enviar arquivos |
| Usuário e senha do FTP | Documento de credenciais do site | Enviar arquivos |

> 💡 Na prática, o **host do FTP costuma ser o próprio domínio do site** (ex: se o site é `meulab.ufpa.br`, o FTP também é `meulab.ufpa.br`) — não um hostname genérico de servidor. Sempre confira o valor exato no documento de credenciais do CTIC em vez de supor.

Se você não tem esses documentos, peça para quem administrava o site antes de você, ou abra um chamado em **https://sagitta.ufpa.br** pedindo acesso à "VPN para administração de sites".

---

## Parte 1 — Instalar a VPN

A UFPA usa VPN **IPsec via FortiClient**. Existem várias edições do FortiClient no site oficial — isso confunde muita gente, então preste atenção nessa parte.

### 1.1. Baixe a versão certa

⚠️ **Use exatamente este link**, que leva direto para a edição correta ("VPN-only"):

**https://links.fortinet.com/forticlient/win/vpnagent**

Não use a página geral de downloads da Fortinet (`fortinet.com/support/product-downloads`) direto — ela mostra primeiro as edições **ZTNA** e **EPP/APT**, que são pacotes corporativos completos, mais pesados, e que na prática **não funcionam bem** para esse tipo de VPN (eles escondem a opção de versão do protocolo IKE e têm proteções que impedem ajustes manuais). Se seu instalador se chamar `FortiClientOnlineInstaller...` ou abrir uma tela perguntando "Zero Trust Telemetry / ZTNA / Vulnerability Scan", **é a versão errada** — cancele e use o link acima.

O instalador certo, depois de instalado, abre com o título simples **"FortiClient VPN"** (sem "Zero Trust Fabric Agent") e vai direto para a tela de conexão, sem pedir nenhum código de servidor corporativo.

### 1.2. Instale

Execute o instalador baixado e siga: aceitar os termos → **Next** → **Install** → **Finish**. Reinicie o computador se ele pedir.

### 1.3. Configure a conexão VPN

1. Abra o **FortiClient VPN** pelo ícone criado na área de trabalho.
2. Se aparecer um aviso sobre a versão gratuita, marque a caixa e clique **"I accept"**.
3. Clique em **"Configurar a VPN"**.
4. Selecione a aba **VPN IPsec** (não deixe em "SSL-VPN").
5. Preencha:

   | Campo | Valor |
   |---|---|
   | Nome da Conexão | `VPN ADM Sites` (ou qualquer nome) |
   | Gateway Remoto | o valor do seu chamado Sagitta (ex: `vpn.dmz.ufpa.br`) |
   | Método de Autenticação | Chave Pré-Compartilhada |
   | (campo abaixo) | cole a **PSK** do seu chamado |

6. Clique em **"+ Configurações avançadas"** para expandir.
7. Confirme que **IKE** está em **"Versão 1"** (na edição certa do FortiClient, isso já vem selecionado por padrão).
8. Clique para expandir **"Fase 1"** e preencha **ID Local** com o valor do seu chamado (ex: `ISP`).
9. Deixe todo o resto nos valores padrão.
10. Clique em **Salvar**.

### 1.4. Conecte

1. Clique em **Conectar** na conexão que você criou.
2. **Usuário**: seu e-mail institucional completo (ex: `nome@campus.ufpa.br`)
3. **Senha**: a senha da sua conta UFPA (a mesma do e-mail/SIGAA)
4. Clique em **Connect**.

Se aparecer **"VPN Conectada"**, deu certo — pode seguir para a Parte 2.

> ⚠️ **Nunca digite sua senha em chats, e-mails ou qualquer lugar fora do próprio campo de login da VPN.** Se isso acontecer sem querer, troque a senha assim que possível.

#### Deu erro "Negotiation_Timeout"?

Esse é o problema mais comum. Verifique, nesta ordem:

1. **Você baixou a edição errada do FortiClient?** (Veja 1.1 — é a causa mais frequente.) Desinstale, reinicie o PC e reinstale usando o link certo.
2. Confira se não sobrou espaço em branco extra ao colar a PSK.
3. Teste em outra rede (dados móveis do celular, por exemplo) para descartar bloqueio do seu roteador/provedor de internet.
4. Se nada resolver, ligue para o CTIC (telefone abaixo) citando o número do seu chamado Sagitta — o problema pode estar do lado do servidor.

---

## Parte 2 — Gerar os arquivos do site

Isso varia conforme a ferramenta usada para construir o site. O importante é: **você nunca envia o código-fonte para o servidor**, só o resultado final (HTML/CSS/JS já prontos, sem precisar de Node.js ou build step no servidor).

Alguns exemplos comuns:

| Ferramenta | Comando de build | Pasta de saída típica |
|---|---|---|
| Vite (React, Vue, etc.) | `npm run build` | `dist/` |
| Create React App | `npm run build` | `build/` |
| Next.js (export estático) | `npm run build && npm run export` | `out/` |
| Site HTML/CSS/JS puro | (nenhum — os arquivos já são os finais) | a própria pasta do projeto |

Confira o `package.json` do projeto (script `"build"`) ou a documentação da ferramenta usada para confirmar o comando e a pasta exatos. Rode esse comando toda vez que fizer uma alteração no código e quiser publicá-la.

---

## Parte 3 — Enviar os arquivos para o servidor (FTP)

Com a VPN conectada (Parte 1), escolha uma das duas formas abaixo.

### 3.0. Antes de enviar: confirme a estrutura de pastas do servidor

Sites diferentes podem ter organizações de pasta ligeiramente diferentes no servidor. **Não presuma** — liste o conteúdo remoto antes de sobrescrever qualquer coisa.

Pelo FileZilla, isso é só abrir a conexão e olhar a coluna da direita. Por linha de comando, dá pra listar assim:

```powershell
curl.exe --list-only --user "SEU_USUARIO_FTP:SUA_SENHA_FTP" "ftp://SEUSITE.ufpa.br/"
```

Na hospedagem de sites da UFPA, o padrão observado é a pasta **`web/`** ser a raiz pública (é lá que fica o `index.html` que os visitantes veem) — mas confirme sempre, e evite mexer em pastas como `stats/`, `error/`, `backup/`, `.ssh/` ou arquivos de verificação (`google*.html`) que não fazem parte do seu build.

### Opção A — FileZilla (recomendado para quem não usa terminal)

1. Baixe o FileZilla Client em **https://filezilla-project.org/download.php?type=client**
2. Instale normalmente (Next, Next, Finish).
3. Abra o FileZilla. No topo, preencha a barra de **Conexão Rápida**:
   - **Host**: o host do FTP (documento de credenciais do site)
   - **Usuário**: (do documento de credenciais do site)
   - **Senha**: (do documento de credenciais do site)
   - **Porta**: `21`
4. Clique em **Conexão Rápida**.
5. Na janela, você verá duas colunas: **local** (seu computador, à esquerda) e **remoto** (o servidor, à direita).
6. Do lado esquerdo, navegue até a pasta de saída do build (ex: `dist`).
7. Do lado direito, entre na pasta raiz pública do site (normalmente **`web`**).
8. Selecione **todo o conteúdo de dentro da** pasta de build (não a pasta em si, o que está dentro dela) e arraste para dentro de `web` no lado direito.
9. O FileZilla substitui os arquivos existentes automaticamente. Aguarde a barra de progresso terminar.

### Opção B — Linha de comando (para quem tem terminal/PowerShell)

Um script simples que envia tudo preservando as subpastas:

```powershell
$user = "SEU_USUARIO_FTP"
$pass = "SUA_SENHA_FTP"
$ftpHost = "SEUSITE.ufpa.br"
$remoteRoot = "web"            # raiz pública do site no servidor
$base = (Resolve-Path "dist").Path   # troque "dist" pela pasta de saída do seu build

$files = Get-ChildItem -Path $base -Recurse -File
foreach ($f in $files) {
    $rel = $f.FullName.Substring($base.Length + 1) -replace '\\','/'
    $url = "ftp://$ftpHost/$remoteRoot/$rel"
    curl.exe -s -S --ftp-create-dirs -T "$($f.FullName)" --user "${user}:${pass}" "$url"
}
Write-Host "Envio concluído"
```

Salve isso como `deploy.ps1` (adicione ao `.gitignore` se colocar usuário/senha reais nele — **nunca comite esse arquivo com credenciais**) e rode com `powershell -File deploy.ps1`. Em ambientes com bash/Git Bash, o mesmo pode ser feito com um laço `find ... | while read` chamando `curl.exe` da mesma forma.

> 💡 O parâmetro `--ftp-create-dirs` cria automaticamente as subpastas no servidor (`assets/`, `images/` etc.) se elas ainda não existirem — por isso não precisa criar nada manualmente antes. Esse método só **envia/sobrescreve** os arquivos que estão na sua pasta de build — ele não apaga nada que já exista no servidor e não esteja no seu build local.

---

## Parte 4 — Conferir que funcionou

Abra a URL do site em uma aba anônima/privada do navegador (evita que o cache mostre a versão antiga) e confira se o site carregou as mudanças.

Se quiser confirmar por linha de comando:

```powershell
curl.exe -s -o NUL -w "Status: %{http_code}`n" -L "https://SEUSITE.ufpa.br/"
```

Um `Status: 200` significa que o site está respondendo normalmente. Para confirmar que é *de fato* a versão nova (e não uma versão em cache), compare o nome dos arquivos JS/CSS referenciados na página com os nomes gerados pelo seu último build — a maioria das ferramentas de build gera nomes com hash (ex: `index-a1b2c3.js`) que mudam a cada build.

---

## Sobre a cota de armazenamento

Sites hospedados pela UFPA têm uma cota de armazenamento (o valor exato consta no seu documento de credenciais — costuma ser algo como 400MB). Como muitas ferramentas de build geram arquivos com nomes novos a cada vez (ex: `index-a1b2c3.js`), os arquivos antigos ficam "órfãos" ocupando espaço aos poucos. Isso não afeta o funcionamento do site, mas de tempos em tempos vale entrar via FTP na pasta de assets e apagar arquivos antigos que não são mais referenciados pelo `index.html` atual.

---

## Onde guardar suas credenciais com segurança

**Nunca** coloque senhas, PSK ou chaves reais dentro de arquivos deste repositório Git (mesmo que pareça privado hoje, repositórios podem ser compartilhados, tornados públicos ou vazados no futuro — e o histórico do Git guarda tudo, mesmo depois de "apagado").

Recomendado:
- Use um **gerenciador de senhas** (Bitwarden, 1Password, etc.) para guardar usuário/senha do FTP, painel de hospedagem e VPN.
- Se quiser um arquivo de referência rápida local, crie algo como `credenciais-ufpa.md` na raiz do projeto — esse padrão de nome **já está no `.gitignore`** deste projeto, então nunca será enviado ao Git por engano.
- Nunca cole senhas em chats, e-mails não criptografados, ou ferramentas de IA (incluindo assistentes de IA usados para ajudar no deploy). Se isso acontecer sem querer, troque a senha depois — no caso do CTIC/UFPA, isso normalmente exige assinar um novo termo de responsabilidade, então trate como algo a ser feito o quanto antes, não "quando sobrar tempo".

---

## Links importantes

| Recurso | Link |
|---|---|
| Download FortiClient VPN-only (Windows) | https://links.fortinet.com/forticlient/win/vpnagent |
| Download FileZilla Client | https://filezilla-project.org/download.php?type=client |
| Abrir/consultar chamados (Sagitta) | https://sagitta.ufpa.br |
| Segurança da informação (CSIRT UFPA) | https://csirt.ufpa.br |
| Atendimento CTIC (telefone) | (91) 3201-7288 |
| Painel de hospedagem do site | `https://SEUSITE.ufpa.br/administrator` *(exige VPN)* |
| phpMyAdmin (se o site usar banco de dados) | `http://SEUSITE.ufpa.br/phpmyadmin` |

---

## Resumo rápido (para quem já fez isso antes)

```
1. Conectar VPN ADM Sites (FortiClient)
2. Rodar o comando de build do projeto (ex: npm run build)
3. Enviar o conteúdo da pasta de build → web/ no servidor (FileZilla ou script FTP)
4. Conferir https://SEUSITE.ufpa.br/ em aba anônima
```
