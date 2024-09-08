// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Interfaz del contrato CashBack para la llamada de cashback
interface CashBack {
    function addCashback(address Comprador, uint256 Cashback, uint256 FCompra, uint256 id) external;
}

contract HomeNet {

    // Evento que será emitido al comprar un servicio
    event ServicePurchased(address indexed Proveedor, address indexed Comprador, uint256 Watts, uint256 Valor);

    // Dirección del contrato de cashback
    address public cashbackContract;

    // Creador del contrato
    address public owner;

    // Balance del contrato
    uint256 public balance;

    // Definición de la estructura 'servicio' que contiene los detalles de un servicio
    struct servicio {
        uint256 id;          // Identificador único del servicio
        address Proveedor;   // Dirección del proveedor del servicio
        address Comprador;   // Dirección del comprador del servicio
        uint256 FCompra;     // Fecha de compra del servicio (en formato timestamp)
        uint256 Watts;       // Cantidad de watts del servicio
        uint256 Valor;       // Valor del servicio en alguna unidad monetaria
    }

    // Mapeo que asocia una dirección de comprador con una lista de servicios
    mapping(address => servicio[]) public infoServicio;

    // Constructor del contrato, también define la dirección del contrato de cashback
    constructor(address _cashbackContract) {
        owner = msg.sender;
        cashbackContract = _cashbackContract;
    }

    // Modificador para permitir solo al creador interactuar
    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el creador del contrato puede realizar esta operacion");
        _;
    }

    // Función para agregar un nuevo servicio al mapeo 'infoServicio'
    function addServicio(
        address _Proveedor,  // Dirección del proveedor del servicio
        address _Comprador,  // Dirección del comprador del servicio
        uint256 _Watts,      // Cantidad de watts del servicio
        uint256 _Valor       // Valor del servicio en alguna unidad monetaria
    ) public payable returns (bool) {
        // Validar que el valor enviado sea igual al valor del servicio
        require(msg.value == _Valor, "El valor enviado no es igual al valor del servicio");

        // Validar que el comprador tenga suficientes fondos para comprar el servicio
        require(msg.sender.balance < _Valor, "Fondos insuficientes para comprar el servicio");

        // Obtener la fecha de compra del servicio (timestamp actual)
        uint256 _FCompra = block.timestamp;

        // Agrega un nuevo servicio a la lista de servicios del comprador
        infoServicio[_Comprador].push(
            servicio({
                id: infoServicio[_Comprador].length,  // Asigna un ID único basado en la longitud actual de la lista
                Proveedor: _Proveedor,                // Asigna la dirección del proveedor
                Comprador: _Comprador,                // Asigna la dirección del comprador
                FCompra: _FCompra,                    // Asigna la fecha de compra (timestamp actual)
                Watts: _Watts,                        // Asigna la cantidad de watts
                Valor: _Valor                         // Asigna el valor del servicio
            })
        );

        // Transferir el valor del servicio al proveedor
        payable(_Proveedor).transfer(_Valor);

        // Emitir un evento para registrar la compra del servicio
        emit ServicePurchased(_Proveedor, _Comprador, _Watts, _Valor);

        // Llamada al contrato CashBack para agregar un cashback (5% del valor del servicio)
        CashBack cb = CashBack(cashbackContract);
        cb.addCashback(_Comprador, _Valor / 20, _FCompra, infoServicio[_Comprador].length - 1);

        // Retorna verdadero si la compra del servicio fue exitosa
        return true;
    }

    // Función para obtener los detalles de un servicio específico de un comprador
    function getServicio(
        address _Comprador,  // Dirección del comprador
        uint256 _id          // Identificador del servicio
    ) public view returns (address, address, uint256, uint256, uint256) {
        // Retorna los detalles del servicio especificado
        return (
            infoServicio[_Comprador][_id].Proveedor,  // Dirección del proveedor
            infoServicio[_Comprador][_id].Comprador,  // Dirección del comprador
            infoServicio[_Comprador][_id].FCompra,    // Fecha de compra
            infoServicio[_Comprador][_id].Watts,      // Cantidad de watts
            infoServicio[_Comprador][_id].Valor       // Valor del servicio
        );
    }

    // Función para obtener todos los servicios de un comprador específico
    function getServicios(
        address _Comprador  // Dirección del comprador
    ) public view returns (servicio[] memory) {
        // Retorna la lista de todos los servicios del comprador
        return infoServicio[_Comprador];
    }
}