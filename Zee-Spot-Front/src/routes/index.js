import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "./protectedRoute";
import routes from "./routes";

import Home from "../views/Home.js";
import FirstGallery from '../views/Galleries/FirstGallery.js';
import Layout from '../components/Layout.js';
import GalleryForm from "../views/Galleries/GalleryForm.js";
import MyGalleries from "../views/Galleries/MyGalleries.js";
import Gallery from "../views/Galleries/Gallery.js";

const Routes = () => {
    const { accessToken, user } = useAuth();

    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: routes.ALL,
            element: <Layout />,
            children: [
                { index: true, element: <Navigate to={routes.HOME} replace /> },
                {
                    path: routes.HOME,
                    element: <Home />,
                },
                {
                    path: routes.FIRST_GALERIE,
                    element: <FirstGallery />
                },
                {
                    path: routes.MY_GALLERIES,
                    element: <MyGalleries />
                },
                {
                    path: routes.GALLERY_FORM,
                    element: <GalleryForm />
                },
                {
                    path: routes.GALLERY,
                    element: <Gallery />
                },
            ],
        },
    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: routes.ALL,
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: routes.HOME,
                    element: <Home />,
                },
                {
                    path: routes.GALLERY_FORM,
                    element: <GalleryForm />
                }
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: routes.ALL,
            element: <Layout />,
            children: [
                {
                    path: routes.HOME,
                    element: <Home />,
                },
            ]
        }
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!accessToken || !user ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;