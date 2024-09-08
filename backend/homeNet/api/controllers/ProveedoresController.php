<?php

use api\models\ProveedoresModel;
use core\utils\Utils;

class ProveedoresController
{

    public static function list()
    {
        (new ProveedoresModel())->getAll();
    }

    public static function routes($operation)
    {
        // Se establece la ruta por defecto
        if ($operation == '') {
            $operation = 'list';
        }

        $operations = [
            'list' => [
                'fnt' => 'list',
                'method' => 'GET',
            ],
        ];

        if (!array_key_exists($operation, $operations)) {
            Utils::RouteNotFound();
            die();
        }

        return (object) $operations[$operation];
    }
}
