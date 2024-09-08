// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CashBack {

    // Evento que será emitido cuando se añada un nuevo cashback
    event CashbackAdded(address indexed Comprador, uint256 Cashback, uint256 FCashBack, uint256 idServicio);

    // Balance del contrato
    uint256 public balance;

    // Direccion del contrato HomeNet autorizado para añadir cashbacks
    address public homeNetContract;

    // Definición de la estructura 'cashback' que contiene los detalles de un cashback
    struct cashback {
        uint256 id;          // Identificador único del cashback
        address Comprador;   // Dirección del comprador del servicio
        uint256 Cashback;    // Valor del cashback en criptomonedas
        uint256 FCashBack;   // Fecha del cashback (timestamp)
        uint256 idServicio;  // Identificador del servicio asociado (de HomeNet.sol)
    }

    // Mapeo que asocia una dirección de comprador con una lista de cashbacks
    mapping(address => cashback[]) public infoCashback;
    
    // Constructor para establecer el contrato autorizado
    constructor(address _homeNetContract) {
        homeNetContract = _homeNetContract;
    }

    // Modificador para permitir solo a HomeNet interactuar
    modifier onlyHomeNet() {
        require(msg.sender == homeNetContract, "Solo el contrato HomeNet puede agregar cashbacks");
        _;
    }

    // Función para agregar un nuevo cashback al mapeo 'infoCashback'
    function addCashback(
        address _Comprador,   // Dirección del comprador del servicio
        uint256 _Cashback,    // Valor del cashback en criptomonedas
        uint256 _FCashBack,   // Fecha de compra del servicio (en formato timestamp)
        uint256 _idServicio   // Identificador del servicio asociado
    ) public onlyHomeNet returns (bool) {
        // Verificar que el cashback sea mayor a 0
        require(_Cashback > 0, "El valor del cashback debe ser mayor a 0");

        // Agrega un nuevo cashback a la lista de cashbacks del comprador
        infoCashback[_Comprador].push(
            cashback({
                id: infoCashback[_Comprador].length,  // Asigna un ID único basado en la longitud actual de la lista
                Comprador: _Comprador,                // Asigna la dirección del comprador
                Cashback: _Cashback,                  // Asigna el valor del cashback
                FCashBack: _FCashBack,                // Asigna la fecha del cashback
                idServicio: _idServicio               // Asigna el identificador del servicio asociado
            })
        );

        // Emitir un evento cuando se añade un nuevo cashback
        emit CashbackAdded(_Comprador, _Cashback, _FCashBack, _idServicio);

        // Retorna verdadero si el cashback se añadió correctamente
        return true;
    }

    // Función para obtener los detalles de un cashback específico de un comprador
    function getCashback(
        address _Comprador, // Dirección del comprador
        uint256 _id // Identificador del cashback
    ) public view returns (address, uint256, uint256, uint256) {
        // Retorna los detalles del cashback especificado
        return (
            infoCashback[_Comprador][_id].Comprador, // Dirección del comprador
            infoCashback[_Comprador][_id].Cashback, // Valor del cashback
            infoCashback[_Comprador][_id].FCashBack, // Fecha de compra
            infoCashback[_Comprador][_id].idServicio // Identificador del servicio asociado
        );
    }

    // Función para obtener todos los cashbacks de un comprador específico
    function getCashbacks(
        address _Comprador // Dirección del comprador
    ) public view returns (cashback[] memory) {
        // Retorna la lista de todos los cashbacks del comprador
        return infoCashback[_Comprador];
    }
}