import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function CGU(){
    return(
        <Box sx={{bgcolor: 'info.main'}}>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // height: `calc(100vh - 204px)`
                }}
            >
                {/* Title */}
                <Box mb={10} sx={{justifySelf: 'flex-start', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Box
                        px={5}
                        py={2}
                        sx={{
                            bgcolor: 'primary.light',
                            boxShadow: 5
                        }}                   
                    >
                        <Typography variant='letter'>CGU</Typography>
                    </Box>
                </Box>

                <Box>
                    <Typography variant="h1b">Conditions Générales d'Utilisation</Typography>
                    <br></br>
                    <Typography variant="h3b">1. Préambule </Typography>
                    <Typography mb={5} variant="h4">
                        Les présentes Conditions Générales d'Utilisation (ci-après "CGU") ont pour objet de définir les modalités et conditions d'utilisation du site ZeeSPOT (ci-après "le Site") par les photographes et les utilisateurs (ci-après collectivement "les Utilisateurs"). En accédant au Site, les Utilisateurs acceptent sans réserve les présentes CGU.
                    </Typography>

                    <Typography variant="h3b">2. Définitions </Typography>
                    <Typography mb={5} variant="h4">
                        Site : La plateforme en ligne permettant aux photographes de créer des comptes, de publier des galeries de photos et aux utilisateurs de consulter ces galeries.
                        Photographe : Tout utilisateur du Site qui crée un compte pour publier des galeries de photos.
                        Utilisateur : Toute personne visitant le Site et consultant les galeries de photos.
                        Galerie Publique : Galerie de photos accessible à tous les Utilisateurs du Site.
                        Galerie Privée : Galerie de photos accessible uniquement via un lien privé fourni par le Photographe.
                    </Typography>

                    <Typography variant="h3b">3. Inscription et Compte </Typography>
                    <Typography mb={5} variant="h4">
                        3.1. L'inscription sur le Site en tant que Photographe est obligatoire pour publier des galeries de photos. <br></br>
                        3.2. Les informations fournies lors de l'inscription doivent être exactes et mises à jour régulièrement. <br></br>
                        3.3. Les Photographes s'engagent à conserver la confidentialité de leurs identifiants de connexion et à notifier immédiatement le Site en cas d'utilisation non autorisée de leur compte.
                    </Typography>

                    <Typography variant="h3b">4. Utilisation du Site</Typography>
                    <Typography mb={5} variant="h4">
                        4.1. Les Photographes peuvent publier des galeries de photos en choisissant de les rendre publiques ou privées. <br></br>
                        4.2. Les Galeries Publiques sont accessibles à tous les Utilisateurs du Site via la page de profil du Photographe. <br></br>
                        4.3. Les Galeries Privées ne sont accessibles qu'aux Utilisateurs disposant d'un lien privé fourni par le Photographe. <br></br>
                        4.4. Les Utilisateurs s'engagent à ne pas partager les liens des Galeries Privées sans l'accord préalable du Photographe.
                    </Typography>

                    <Typography variant="h3b">5. Droits et Obligations des Photographes</Typography>
                    <Typography mb={5} variant="h4">
                        5.1. Les Photographes conservent la propriété intellectuelle de leurs photos publiées sur le Site. <br></br>
                        5.2. En publiant des photos sur le Site, les Photographes accordent au Site une licence non exclusive pour afficher ces photos sur le Site. <br></br>
                        5.3. Les Photographes garantissent que les photos publiées respectent les droits des tiers (notamment les droits d'auteur) et ne contiennent aucun contenu illicite.
                    </Typography>

                    <Typography variant="h3b">6. Droits et Obligations des Utilisateurs</Typography>
                    <Typography mb={5} variant="h4">
                        6.1. Les Utilisateurs peuvent consulter les Galeries Publiques et, avec un lien privé, les Galeries Privées. <br></br>
                        6.2. Les Utilisateurs s'engagent à utiliser le Site conformément aux lois en vigueur et aux présentes CGU. <br></br>
                        6.3. Les Utilisateurs s'interdisent de reproduire, distribuer ou exploiter de quelque manière que ce soit les photos présentes sur le Site sans l'autorisation du Photographe.
                    </Typography>

                    <Typography variant="h3b">7. Responsabilité </Typography>
                    <Typography mb={5} variant="h4">
                        7.1. Le Site met tout en œuvre pour assurer un service de qualité, mais ne peut garantir l'absence de bugs ou d'interruptions. <br></br>
                        7.2. Le Site décline toute responsabilité en cas de perte de données ou d'accès non autorisé aux comptes des Photographes. <br></br>
                        7.3. Le Site fait son maximum pour empêcher la publication de contenu illicite, mais il ne saurait être tenu responsable des contenus publiés par les Photographes.
                    </Typography>

                    <Typography variant="h3b">8. Protection des Données Personnelles</Typography>
                    <Typography mb={5} variant="h4">
                        8.1. Les données personnelles des Utilisateurs sont collectées et traitées conformément à la politique de confidentialité du Site. <br></br>
                        8.2. Les Utilisateurs disposent d'un droit d'accès, de rectification et de suppression de leurs données personnelles conformément à la législation en vigueur.
                    </Typography>

                    <Typography variant="h3b">9. Modifications des CGU </Typography>
                    <Typography mb={5} variant="h4">
                        Le Site se réserve le droit de modifier les présentes CGU à tout moment. Les modifications seront publiées sur le Site et entreront en vigueur dès leur publication. Les Utilisateurs sont invités à consulter régulièrement les CGU.
                    </Typography>
                    
                    <Typography variant="h3b">10. Loi Applicable et Juridiction</Typography>
                    <Typography mb={5} variant="h4">
                        Les présentes CGU sont soumises à la loi française. Tout litige relatif à leur interprétation et/ou à leur exécution relève des tribunaux compétents de Reims.
                    </Typography>

                    <Typography variant="h3b">
                        En utilisant le Site, vous acceptez d'être lié par les présentes CGU.
                        Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le site.
                    </Typography>
                </Box>

            </Container>
        </Box>
    )
}