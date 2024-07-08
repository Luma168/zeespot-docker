<?php

namespace App\Controller\User;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class GetPhotographesController extends AbstractController
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    #[Route('/api/photographes', name: 'get_photographes', methods: ['GET'])]
    public function __invoke(): JsonResponse
    {
        $photographes = $this->userRepository->findByRole('ROLE_PHOTOGRAPHE');

        return $this->json($photographes);
    }
}
