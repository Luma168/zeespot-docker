<?php

namespace App\Controller\Image;

use App\Entity\Galerie;
use App\Entity\Image;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ImageUploadController extends AbstractController
{
    public function __invoke(EntityManagerInterface $entityManager, Request $request) : Image
    {
        $upladedImages = $request->files->get('images');
        $galerieId = $request->get('galerie');
        $galerie = $entityManager->getRepository(Galerie::class)->findOneBy(["id" => $galerieId]);
        $selected = $request->get('selected');
        $cover = $request->get('cover');

        if (!$upladedImages) {
            throw new BadRequestHttpException('"file" is required');
        }

        $image = new Image();
        $image->setImageFile($upladedImages);
        $image->setUpdatedAt(new \DateTimeImmutable());
        $image->setGalerie($galerie);
        $image->setSelected($selected);
        $image->setCover($cover);

        $galerie->addImage($image);

        return $image;
    }
}
