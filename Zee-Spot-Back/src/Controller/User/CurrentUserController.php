<?php

namespace App\Controller\User;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CurrentUserController extends AbstractController
{
    //#[Route('/api/me', name: 'me', methods: 'get')]
    public function __invoke(SerializerInterface $serializer): JsonResponse
    {
        $user = $this->getUser();
        $jsonUser = $serializer->serialize($user, 'json', ['groups' => 'getUser']);
        return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
    }
}
