// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract HomeNetToken is ERC20, ERC20Permit {
    // Mapeo para almacenar la lista blanca de direcciones permitidas
    mapping(address => bool) whitelist;

    // Constructor del contrato que inicializa el token, acuña 1000 tokens y agrega el propietario inicial a la lista blanca
    constructor(address initialOwner)
        ERC20("HOMES TOKEN", "HMT")           // Inicializa el token con el nombre "HMToken" y el símbolo "HMT"
        ERC20Permit("HOMESTOKEN")            // Inicializa el permiso ERC20 con el nombre "HMToken"
    {
        whitelist[initialOwner] = true;   // Agrega el propietario inicial a la lista blanca
        
        // Acuñar 1000 tokens (enviados al propietario inicial)
        _mint(initialOwner, 1000 * 10 ** decimals()); // Asigna 1000 tokens con 18 decimales al propietario inicial
    }

    // Función para agregar una dirección a la lista blanca
    function addToWhitelist(address account) external {
        whitelist[account] = true;  // Agrega la dirección especificada a la lista blanca
    }

    // Función para eliminar una dirección de la lista blanca
    function removeFromWhitelist(address account) external {
        whitelist[account] = false;  // Elimina la dirección especificada de la lista blanca
    }

    // Función para acuñar nuevos tokens, solo permitida para direcciones en la lista blanca
    function mint(address to, uint256 amount) external {
        // Verifica que el remitente de la transacción esté en la lista blanca
        require(whitelist[msg.sender], "No estas autorizado para emitir tokens");
        _mint(to, amount);  // Acuña la cantidad especificada de tokens a la dirección destino
    }
}