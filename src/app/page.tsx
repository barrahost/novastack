// Page racine en export statique : redirige vers la locale par défaut /fr.
// (redirect() serveur n'est pas disponible en `output: export`.)
export default function RootPage() {
  return (
    <html lang="fr">
      <head>
        <meta httpEquiv="refresh" content="0; url=/fr/" />
        <link rel="canonical" href="/fr/" />
      </head>
      <body>
        <p>
          Redirection vers <a href="/fr/">NovaStack Africa</a>…
        </p>
      </body>
    </html>
  );
}
