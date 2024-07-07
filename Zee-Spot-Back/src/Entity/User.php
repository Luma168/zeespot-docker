<?php

namespace App\Entity;


use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Controller\User\CurrentUserController;
use App\Controller\User\RegistrationController;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[ApiResource(
    operations: [
        new Get(
            uriTemplate: '/me',
            controller: CurrentUserController::class,
            name: 'me'
        ),
        new Post(
            uriTemplate: '/register',
            controller: RegistrationController::class,
            name: 'register'
        ),
        new Patch(),
    ]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["getUser"])]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    #[Assert\NotBlank(message: "L'adresse mail d'utilisateur est obligatoire")]
    #[Assert\Email(message: 'The email {{ value }} is not a valid email.')]
    #[Groups(["getUser"])]
    private ?string $email = null;

    // #[ORM\Column(length: 180, unique: true)]
    // private ?string $username = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    #[Groups(["getUser"])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Le nom d'utilisateur est obligatoire")]
    #[Assert\Length(
        min: 2,
        max: 255,
        minMessage: "Le titre doit faire au moins {{ limit }} caractères",
        maxMessage: "Le titre ne peut pas faire plus de {{ limit }} caractères"
    )]
    #[Groups(["getUser"])]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Le prénom d'utilisateur est obligatoire")]
    #[Assert\Length(min: 2,
        max: 255,
        minMessage: "Le titre doit faire au moins {{ limit }} caractères",
        maxMessage: "Le titre ne peut pas faire plus de {{ limit }} caractères"
    )]
    #[Groups(["getUser"])]
    private ?string $prenom = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Regex(
        pattern: '/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/',
        htmlPattern: '/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/'
    )]
    #[Groups(["getUser"])]
    private ?string $tel_primaire = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Regex(
        pattern: '/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/',
        htmlPattern: '/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/'
    )]
    #[Groups(["getUser"])]
    private ?string $tel_secondaire = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["getUser"])]
    private ?string $adresse_psotale = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Regex(
        pattern: '/^[0-9]{14}$/',
        htmlPattern: '/^[0-9]{14}$/'
    )]
    #[Groups(["getUser"])]
    private ?string $siret = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["getUser"])]
    private ?string $siege_social = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Url(
        message: 'The url {{ value }} is not a valid url',
    )]
    #[Groups(["getUser"])]
    private ?string $facebook_link = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Url(
        message: 'The url {{ value }} is not a valid url',
    )]
    #[Groups(["getUser"])]
    private ?string $instagram_link = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Url(
        message: 'The url {{ value }} is not a valid url',
    )]
    #[Groups(["getUser"])]
    private ?string $tiktok_link = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Url(
        message: 'The url {{ value }} is not a valid url',
    )]
    #[Groups(["getUser"])]
    private ?string $pinterest_link = null;

    /**
     * @var Collection<int, Galerie>
     */
    #[ORM\OneToMany(targetEntity: Galerie::class, mappedBy: 'user')]
    private Collection $galeries;

    public function __construct()
    {
        $this->galeries = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }
    
    public function getUsername(): string {
        return $this->getUserIdentifier();
    }

    // public function getUsername(): string
    // {
    //     return $this->username;
    // }
  
    // public function setUsername(string $username): self
    // {
    //     $this->username = $username;
  
    //     return $this;
    // }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getTelPrimaire(): ?string
    {
        return $this->tel_primaire;
    }

    public function setTelPrimaire(?string $tel_primaire): static
    {
        $this->tel_primaire = $tel_primaire;

        return $this;
    }

    public function getTelSecondaire(): ?string
    {
        return $this->tel_secondaire;
    }

    public function setTelSecondaire(?string $tel_secondaire): static
    {
        $this->tel_secondaire = $tel_secondaire;

        return $this;
    }

    public function getAdressePsotale(): ?string
    {
        return $this->adresse_psotale;
    }

    public function setAdressePsotale(?string $adresse_psotale): static
    {
        $this->adresse_psotale = $adresse_psotale;

        return $this;
    }

    public function getSiret(): ?string
    {
        return $this->siret;
    }

    public function setSiret(?string $siret): static
    {
        $this->siret = $siret;

        return $this;
    }

    public function getSiegeSocial(): ?string
    {
        return $this->siege_social;
    }

    public function setSiegeSocial(?string $siege_social): static
    {
        $this->siege_social = $siege_social;

        return $this;
    }

    public function getFacebookLink(): ?string
    {
        return $this->facebook_link;
    }

    public function setFacebookLink(?string $facebook_link): static
    {
        $this->facebook_link = $facebook_link;

        return $this;
    }

    public function getInstagramLink(): ?string
    {
        return $this->instagram_link;
    }

    public function setInstagramLink(?string $instagram_link): static
    {
        $this->instagram_link = $instagram_link;

        return $this;
    }

    public function getTiktokLink(): ?string
    {
        return $this->tiktok_link;
    }

    public function setTiktokLink(?string $tiktok_link): static
    {
        $this->tiktok_link = $tiktok_link;

        return $this;
    }

    public function getPinterestLink(): ?string
    {
        return $this->pinterest_link;
    }

    public function setPinterestLink(?string $pinterest_link): static
    {
        $this->pinterest_link = $pinterest_link;

        return $this;
    }

    /**
     * @return Collection<int, Galerie>
     */
    public function getGaleries(): Collection
    {
        return $this->galeries;
    }

    public function addGalery(Galerie $galery): static
    {
        if (!$this->galeries->contains($galery)) {
            $this->galeries->add($galery);
            $galery->setUser($this);
        }

        return $this;
    }

    public function removeGalery(Galerie $galery): static
    {
        if ($this->galeries->removeElement($galery)) {
            // set the owning side to null (unless already changed)
            if ($galery->getUser() === $this) {
                $galery->setUser(null);
            }
        }

        return $this;
    }
}
