<?php

namespace api\models;

use core\main\FrameworkOrm;
use core\main\models\UserModel;

class ProveedoresModel extends FrameworkOrm
{
    const TABLE = 'proveedores';

    const ARRAY_MAPPER = [
        'id' => [
            'type' => 'int',
            'primary' => true,
            'autoincrement' => true,
            'nullable' => false,
        ],
        'name' => [
            'type' => 'varchar',
            'nullable' => false,
        ],
        'wallet' => [
            'type' => 'varchar',
            'nullable' => false,
        ],
        'city' => [
            'type' => 'varchar',
            'nullable' => false,
        ],
        'valor' => [
            'type' => 'int',
            'nullable' => false,
        ],
    ];
}
