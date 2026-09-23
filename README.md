# 📱 Aplicativo Nível de Bolha Digital

> **Bem-vindo(a)!** 👋  
> Não se preocupe se você não entende muito de computadores, códigos ou programação.  
> Este manual foi feito com muito carinho, passo a passo, bem mastigadinho, para qualquer pessoa conseguir ligar e usar o aplicativo sem medo de errar!

---

## 🧐 1. O que é este aplicativo?

Sabe aquele **nível de pedreiro** tradicional, que é uma régua amarela com uma bolinha dentro de um líquido verde que se mexe?

Quando a bolinha fica exatamente no meinho, significa que a parede, o quadro ou a mesa estão **retos e nivelados** (sem cair para nenhum dos lados).

Este aplicativo faz exatamente a mesma coisa, só que **dentro da tela do seu celular**, usando os sensores de movimento que o próprio celular já possui!

### 🔨 Para que você pode usar:
* **Pendurar quadros e espelhos** na parede sem deixá-los tortos.
* **Nivelar mesas, prateleiras e fogões**.
* **Instalar máquinas de lavar** (para não ficarem trepidando ou andando sozinhas).
* **Verificar superfícies e inclinações** em geral no dia a dia.

---

## 🎒 2. O que você precisa ter em mãos?

Antes de começar, você só precisa de **três coisas simples**:

1. **Um computador** com internet.
2. **Um celular** (pode ser Android ou iPhone).
3. **Estar no mesmo Wi-Fi**: o computador e o celular precisam estar conectados na mesma rede de internet (no mesmo roteador da sua casa ou trabalho).

---

## 📲 3. Preparando o seu Celular (Apenas 1 vez)

No seu celular, você vai baixar um aplicativo gratuito que serve para abrir projetos em teste.

1. Pegue o seu celular e abra a loja de aplicativos:
   * Se o seu celular for **Android**: Abra a **Google Play Store**.
   * Se o seu celular for **iPhone**: Abra a **App Store**.
2. Na barra de pesquisa, digite: **Expo Go**
3. Clique em **Instalar** (o ícone é um triângulo/seta preta ou estilizada).
4. Pronto! Pode deixar o celular de lado por um minutinho.

---

## 💻 4. Ligando o Aplicativo no Computador (Passo a Passo)

Siga estes passos com calma. Não tem como estragar nada!

### Passo 1: Abrir o Prompt / Terminal
1. No seu computador, abra a pasta deste projeto (`nivel-bolha`).
2. Clique com o botão direito em um espaço vazio da pasta e escolha **"Abrir no Terminal"** (ou abra o terminal do seu editor, como VS Code / Antigravity).

---

### Passo 2: Baixar os complementos necessários
*(Faça isso apenas na primeira vez que for usar)*

No terminal preto do computador, copie e cole este comando e aperte a tecla **ENTER**:

```bash
npm install
```

> ⏳ *Aguarde um ou dois minutinhos. Ele vai carregar uma barra e baixar os arquivos necessários. Quando a linha voltar a ficar livre para digitar, significa que terminou.*

---

### Passo 3: Iniciar o aplicativo
Agora, no mesmo terminal, digite o seguinte comando e aperte **ENTER**:

```bash
npm start
```

---

### Passo 4: Conectar o Celular com o QR Code
Na tela do seu computador vai aparecer um quadrado preto e branco cheio de pontinhos (chamado **QR Code**), parecido com este:

```text
  ██████████████  
  ██          ██  
  ██  ██████  ██   <-- (Um código como esse vai aparecer no terminal)
  ██          ██  
  ██████████████  
```

Agora veja como ler esse código no seu aparelho:

#### 🤖 Se o seu celular for Android:
1. Abra o aplicativo **Expo Go** que você instalou.
2. Toque no botão azul **"Scan QR Code"** (Escanear código).
3. Aponte a câmera do celular para o quadrado que apareceu na tela do computador.

#### 🍏 Se o seu celular for iPhone:
1. Abra a **Câmera comum** do seu iPhone.
2. Aponte a câmera para o quadrado na tela do computador.
3. Vai aparecer uma notificação amarela dizendo para abrir no **Expo Go**. Toque nela.

🎉 **MÁGICA!** O aplicativo vai carregar no seu celular e já começará a medir o nível!

---

## 🖥️ 5. Não quer usar o celular agora? Teste no Computador!

Você também pode abrir o aplicativo direto no navegador de internet do computador (Google Chrome, Edge, etc.):

1. No terminal onde você deu `npm start`, aperte apenas a letra **`w`** no seu teclado.
2. Uma aba do navegador vai se abrir automaticamente mostrando o aplicativo.
3. **Dica Especial:** Como o computador não tem sensor de movimento físico, vai aparecer uma barra amarela chamada **"Modo Simulação"**. Nela, você pode clicar nos botões (ex: *0° Perfeito*, *+2.5° Inclinado*) para testar e ver as cores mudando!

---

## 🎨 6. Como ler as cores e os números na tela

O aplicativo se comunica com você através de cores muito intuitivas:

| Cor na Tela | O que significa? | O que você deve fazer? |
| :--- | :--- | :--- |
| 🟢 **Verde brilhante** | **PERFEITO! Está 100% reto!** | Pode furar, apertar ou fixar. Está alinhado! |
| 🟡 **Amarelo / Laranja** | **Quase reto (Chegando perto)** | Ajuste só mais um pouquinho para o lado. |
| 🔴 **Vermelho / Cinza escuro** | **Inclinado / Fora de nível** | O objeto está bem torto, precisa mover mais. |

---

## 🧭 7. Conhecendo os Modos de Uso

No topo da tela você encontra botões para escolher como deseja medir:

* ⚡ **Automático:** O modo mais inteligente! Se você deitar o celular na mesa, ele ativa o modo superfície. Se você colocar o celular em pé na parede, ele ativa o modo régua automaticamente!
* 🎯 **Superfície 2D (Olho de Boi):** Ideal para mesas, bancadas e pisos. Coloque o celular deitado de costas na superfície. Uma bolinha central deve se encaixar no círculo do meio.
* ↔ **Horizontal:** Ideal para prateleiras e quadros. Apoie a lateral comprida do celular em cima do objeto.
* ↕ **Vertical (Prumo):** Ideal para batentes de porta, postes e paredes. Apoie a lateral do celular em pé.
* ✛ **Duplo:** Mostra dois níveis na mesma tela para quem gosta de máxima precisão.

---

## 🕹️ 8. O que fazem os botões da barra inferior?

Na parte de baixo da tela, você tem 4 botões super úteis:

1. 🎯 **Zerar / Calibrar (Tara):**  
   *Sabe quando a capinha do celular tem um relevo ou você quer usar uma mesa como referência?*  
   Coloque o celular na posição de referência e aperte este botão. Ele passa a considerar aquela posição como o seu "zero perfeito". Para voltar ao normal, basta tocar em **"Resetar Tara"**.

2. ⏸ **Travar / Destravar (Congelar medição):**  
   Precisa medir um lugar escuro ou de difícil acesso onde você não consegue enxergar a tela?  
   Encoste o celular lá, aperte **Travar** e retire o celular. O valor fica congelado na tela para você ler com calma!

3. ⚖ **Precisão (ex: ±0.5°):**  
   Permite escolher o quanto você é exigente:
   * **±0.2°**: Precisão cirúrgica de profissional.
   * **±0.5°**: Padrão ideal para reformas e decoração de casa.
   * **±1.0° ou ±2.0°**: Para medições rápidas e sem estresse.

4. 📳 **Vibração:**  
   Quando estiver ativado, o celular vai **vibrar na sua mão** no exato milésimo de segundo em que atingir o nível perfeito (verde)! Assim você nem precisa ficar olhando fixo para a tela.

---

## 🆘 9. Socorro! Deu problema! O que fazer?

Fique calmo(a), a maioria das dúvidas se resolve em 10 segundos:

### ❓ "O aplicativo Expo Go diz que não conseguiu conectar"
* **Causa mais comum:** O celular está usando o 4G/5G ou está em um Wi-Fi diferente do computador.
* **Como resolver:** Verifique se o celular e o computador estão na mesma rede Wi-Fi.
* **Alternativa fácil:** No terminal do computador, pare o processo (aperte as teclas `Ctrl` + `C`) e inicie com este comando alternativo:
  ```bash
  npx expo start --tunnel
  ```
  *(Esse modo cria uma ponte na internet e funciona mesmo se o Wi-Fi for chato ou restrito).*

---

### ❓ "A bolinha do nível não se mexe no celular"
* Feche o Expo Go completamente no celular e abra de novo.
* Mexa o celular em formato de "oito" (8) no ar para calibrar a bússola/acelerômetro do próprio aparelho.

---

### ❓ "A tela do computador fechou ou deu erro vermelho"
* Feche a janelinha do terminal, abra de novo e digite:
  ```bash
  npm start
  ```
  Isso reinicia o servidor do zero.

---

### ❓ "Como faço para desligar tudo quando terminar?"
* No terminal do computador, pressione junto as teclas **`Ctrl` + `C`** e aperte a letra **`s`** (ou `y`) para confirmar. Pronto, o sistema foi desligado com segurança!

---

## 💡 Dica de Ouro para Boas Medições

> ⚠️ **Atenção à capinha do seu celular:**  
> Se a capinha do seu celular tiver botões salientes, anel de segurar ou relevos atrás, tire a capinha antes de medir, ou apoie uma borda lisa do celular diretamente na superfície para a medição ficar 100% perfeita!

---

❤️ *Projeto desenvolvido com carinho para ser fácil, acessível e útil no seu dia a dia!*
