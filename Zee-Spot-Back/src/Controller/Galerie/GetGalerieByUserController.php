<?php

namespace App\Controller\Galerie;

use App\Entity\Galerie;
use App\Repository\GalerieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class GetGalerieByUserController extends AbstractController
{
    private $security;
    private $galerieRepository;

    public function __construct(Security $security, GalerieRepository $galerieRepository)
    {
        $this->security = $security;
        $this->galerieRepository = $galerieRepository;
    }

    #[Route('/api/getgaleriebyuser', name: 'get_galerie_by_user', methods: ['GET'])]
    public function __invoke(): JsonResponse
    {
        $user = $this->security->getUser();

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        $galeries = $this->galerieRepository->findBy(['user' => $user]);

        return $this->json($galeries);
    }
}