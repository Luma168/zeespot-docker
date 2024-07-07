<?php

namespace App\Controller\Galerie;

use App\Entity\Galerie;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class GalerieAddController extends AbstractController
{
    public function __invoke(ManagerRegistry $doctrine, EntityManagerInterface $entityManager, Request $request, ValidatorInterface $validator, SerializerInterface $serializer): JsonResponse
    {
        $em = $doctrine->getManager();
        $requestContent = json_decode($request->getContent());
        $userId = json_decode($requestContent->user)->id;
        $user = $entityManager->getRepository(User::class)->find($userId);

        $titre = $requestContent->titre;
        $date = $requestContent->date;
        $disposition = $requestContent->disposition;
        $public = $requestContent->public;

        $galerie = new Galerie();
        $galerie->setUser($user);
        $galerie->setTitre($titre);
        $galerie->setDate(new \DateTimeImmutable($date));
        $galerie->setDisposition($disposition);
        $galerie->setPublic($public);
        $galerie->setAccessToken(Uuid::v4());

        $errors = $validator->validate($galerie);

        if ($errors->count() > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), JsonResponse::HTTP_BAD_REQUEST, [], true);
        }

        $em->persist($galerie);
        $em->flush();

        return new JsonResponse($serializer->serialize($galerie,'json'), JsonResponse::HTTP_CREATED,[],true);
    }
}
