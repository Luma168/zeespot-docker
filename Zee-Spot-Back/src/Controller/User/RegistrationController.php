<?php

namespace App\Controller\User;


use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegistrationController extends AbstractController
{
    public function __invoke(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher, ValidatorInterface $validator, SerializerInterface $serializer): JsonResponse
    {
        $em = $doctrine->getManager();
        $decoded = json_decode($request->getContent());

        $email = $decoded->email ?? null;
        $nom = $decoded->nom ?? null;
        $prenom = $decoded->prenom ?? null;
        $tel_primaire = $decoded->tel_primaire ?? null;
        $tel_secondaire = $decoded->tel_secondaire ?? null;
        $adresse_postale = $decoded->adresse_postale ?? null;
        $siret = $decoded->siret ?? null;
        $siege_social = $decoded->siege_social ?? null;
        $plaintextPassword = $decoded->password ?? null;

        $user = new User();
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );

        $user->setPassword($hashedPassword);
        $user->setEmail($email);
        $user->setNom($nom);
        $user->setPrenom($prenom);
        $user->setTelPrimaire($tel_primaire);
        $user->setTelSecondaire($tel_secondaire);
        $user->setAdressePsotale($adresse_postale);
        $user->setSiret($siret);
        $user->setSiegeSocial($siege_social);
        // $user->setUsername($email);

        // On vérifie les erreurs
        $errors = $validator->validate($user);

        if ($errors->count() > 0) {
            return new JsonResponse($serializer->serialize($errors, 'json'), JsonResponse::HTTP_BAD_REQUEST, [], true);
        }

        $em->persist($user);
        $em->flush();
   
        return $this->json(['message' => 'Registered Successfully']);
    }
}