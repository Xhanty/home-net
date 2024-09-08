# HomeNet - Plataforma de Energía Prepaga con Criptomonedas

**HomeNet** es una plataforma descentralizada para contratar energía renovable prepaga usando criptomonedas. Basado en la red Avalanche y aprovechando la tecnología de Web3, permite a los usuarios realizar transacciones seguras mediante contratos inteligentes (Smart Contracts) escritos en Solidity. Los usuarios también obtienen **cashback** en nuestro token nativo **HMT** por cada compra de energía, y cuentan con un panel para visualizar gráficos de consumo y otras métricas.

## Características
- **Contratación de energía renovable prepaga** mediante criptomonedas.
- **Cashback en tokens HMT** cada vez que se realiza una compra.
- **Panel de usuario** con gráficos de consumo energético y transacciones.
- **Integración con la red Avalanche** para asegurar transacciones rápidas y de bajo costo.
- **Soporte para Core Wallet** para gestionar tokens HMT y criptomonedas.

## Tecnologías
- **Blockchain**: Avalanche
- **Lenguaje de Smart Contracts**: Solidity
- **Frontend**: Next.js
- **Wallet**: Core Wallet
- **Token Nativo**: HMT (HomeNet Token)
- **Gráficos y Visualización**: Librerías como Chart.js o D3.js para gráficos interactivos.

## Uso

1. Registarse en la plataforma.
2. Conectar tu Core Wallet.
3. Adquirir energía prepaga usando criptomonedas.
4. Recibir tokens HMT como recompensa en cada compra.
5. Visualizar el consumo energético y el balance de tokens en el panel de usuario.

## Arquitectura del Proyecto

### 1. **Contratos Inteligentes (Smart Contracts)**
   Los contratos inteligentes están escritos en Solidity y son desplegados en la red de Avalanche. Incluyen la lógica para la compra de energía y la distribución de cashback en tokens HMT.

### 2. **Frontend**
   El frontend está construido usando Next.js para proveer una interfaz rápida y moderna. Utiliza Web3.js y ethers.js para interactuar con los contratos inteligentes.

### 3. **Gráficas de Consumo**
   Se implementan gráficos usando **Chart.js** para visualizar el historial de consumo energético y el balance de tokens HMT.

### 4. **Cartera Digital (Wallet)**
   Se utiliza Core Wallet para la gestión de criptomonedas y tokens, con soporte también para Metamask.