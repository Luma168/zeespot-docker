<?php

namespace App\Controller\Image;

use App\Entity\Galerie;
use App\Repository\ImageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GetCoverImageController extends AbstractController
{
    private ImageRepository $imageRepository;

    public function __construct(ImageRepository $imageRepository)
    {
        $this->imageRepository = $imageRepository;
    }

    #[Route('/api/galerie/{id}/cover', name: 'get_cover_image', methods: ['GET'])]
    public function __invoke(Galerie $galerie): JsonResponse
    {
        $coverImage = $this->imageRepository->findOneBy(['galerie' => $galerie, 'cover' => true]);

        if (!$coverImage) {
            return new JsonResponse(['error' => 'Cover image not found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse(['coverImage' => $coverImage->getName()]);
    }
}
