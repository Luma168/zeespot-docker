<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240418174711 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', selected TINYINT(1) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user CHANGE roles roles JSON NOT NULL, CHANGE tel_primaire tel_primaire VARCHAR(255) DEFAULT NULL, CHANGE tel_secondaire tel_secondaire VARCHAR(255) DEFAULT NULL, CHANGE adresse_psotale adresse_psotale VARCHAR(255) DEFAULT NULL, CHANGE siret siret VARCHAR(255) DEFAULT NULL, CHANGE siege_social siege_social VARCHAR(255) DEFAULT NULL, CHANGE facebook_link facebook_link VARCHAR(255) DEFAULT NULL, CHANGE instagram_link instagram_link VARCHAR(255) DEFAULT NULL, CHANGE tiktok_link tiktok_link VARCHAR(255) DEFAULT NULL, CHANGE pinterest_link pinterest_link VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE image');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT NOT NULL COLLATE `utf8mb4_bin`, CHANGE tel_primaire tel_primaire VARCHAR(255) DEFAULT \'NULL\', CHANGE tel_secondaire tel_secondaire VARCHAR(255) DEFAULT \'NULL\', CHANGE adresse_psotale adresse_psotale VARCHAR(255) DEFAULT \'NULL\', CHANGE siret siret VARCHAR(255) DEFAULT \'NULL\', CHANGE siege_social siege_social VARCHAR(255) DEFAULT \'NULL\', CHANGE facebook_link facebook_link VARCHAR(255) DEFAULT \'NULL\', CHANGE instagram_link instagram_link VARCHAR(255) DEFAULT \'NULL\', CHANGE tiktok_link tiktok_link VARCHAR(255) DEFAULT \'NULL\', CHANGE pinterest_link pinterest_link VARCHAR(255) DEFAULT \'NULL\'');
    }
}
