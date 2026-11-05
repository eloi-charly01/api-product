<?php 

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Id\AbstractIdGenerator;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Uid\UuidV8;

class CustomUuidGenerator extends AbstractIdGenerator
{
    public function generateId(EntityManagerInterface $em, ?object $entity): Uuid
    {
        return UuidV8::v4();
    }
}