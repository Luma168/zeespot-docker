<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use App\Controller\Image\GetCoverImageController;
use App\Controller\Image\ImageUploadController;
use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
#[Vich\Uploadable]
#[ApiResource(
    operations: [
        new Get(),
        new Post(
            controller: ImageUploadController::class,
            deserialize: false
        ),
        new Delete(),
        new Get(
            uriTemplate: '/galerie/{id}/cover',
            controller: GetCoverImageController::class,
            name: 'get_cover_image'
        )
    ]
)]
class Image
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;


    #[Vich\UploadableField(mapping: 'images_upload', fileNameProperty: 'name')]
    private ?File $imageFile = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column(nullable: true)]
    private ?bool $selected = null;

    #[ORM\ManyToOne(inversedBy: 'images')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Galerie $galerie = null;

    #[ORM\Column(nullable: true)]
    private ?bool $cover = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }


    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function setImageFile(?File $imageFile): void
    {
        $this->imageFile = $imageFile;
    }

    public function isSelected(): ?bool
    {
        return $this->selected;
    }

    public function setSelected(?bool $selected): static
    {
        $this->selected = $selected;

        return $this;
    }

    public function getGalerie(): ?Galerie
    {
        return $this->galerie;
    }

    public function setGalerie(?Galerie $galerie): static
    {
        $this->galerie = $galerie;

        return $this;
    }

    public function isCover(): ?bool
    {
        return $this->cover;
    }

    public function setCover(?bool $cover): static
    {
        $this->cover = $cover;

        return $this;
    }
}
