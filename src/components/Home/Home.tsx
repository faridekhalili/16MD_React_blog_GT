import {NavBar} from '../NavBar/NavBar';

export const Home = () => {
    return (
        <div>
            <div className='addPostButtonContainer'>
                <NavBar />
            </div>
            <div className='homeContainer'>
                <h1 style={{textAlign: 'center'}}>Home</h1>
                <p>
                    <b>MD16</b>
                </p>
                <div>
                    <p style={{padding: '10px 0px'}}>
                        Uzdevums Izveidot simple bloga aplikāciju izmanojot json-server.
                    </p>
                    <p>
                        <b>Ieskatam:</b>
                    </p>
                    <a
                        className='ahome'
                        href='https://www.figma.com/file/UN5OdHvbGlpDjsuBpG0CSw/16MD?node-id=0%3A1&t=1Gg7sLaNvuUvOH4E-1'
                        target='_blank'
                    >
                        Link to Figma
                    </a>
                    <p style={{textAlign: 'justify', padding: '10px 0px'}}>
                        Izmantojam React Router Home skats, kur neliels apraksts par blogu. Bloga skats, kur ir kartiņas
                        ar ierakstiem, attiecīgi var aiziet uz single bloga skatu, kurā vēl nāk klāt komentārs un edit
                        post. Pievienot ierakstu skats, kur ir trīs inputi bilde, title un content, ja vēlamies, varam
                        arī pielikt author. npm create vite@latest Izmantojam Tanstack Query, paskatamies kā strādā
                        mutācijas. Komentāriem jāglabājas json-server db failā, klāt pie bloga ieraksta. Par stilu
                        neiespringstam, galvenais ,lai strādā EXTRA (Nav obligāta) Pieliekam Jāņa rādīto toast
                        bibliotēku ,lai parādītu ka posts,komentārs veiksmīgi ielicies.
                    </p>
                    <p>
                        <b>Noderīgi:</b>
                    </p>
                    <a
                        className='ahome'
                        href='https://tanstack.com/query/v4/docs/react/guides/mutations'
                        target='_blank'
                    >
                        Query Mutations
                    </a>
                    <br />
                    <a
                        className='ahome'
                        href='https://tanstack.com/query/v4/docs/react/guides/query-invalidation'
                        target='_blank'
                    >
                        Query Invalidation
                    </a>
                    <br />
                    <a
                        className='ahome'
                        href='https://tanstack.com/query/v4/docs/react/guides/query-cancellation'
                        target='_blank'
                    >
                        Query Cancellation
                    </a>
                    <br />
                    <a
                        className='ahome'
                        href='https://tanstack.com/query/v4/docs/react/examples/react/rick-morty'
                        target='_blank'
                    >
                        Rick and Morty example
                    </a>
                    <br />
                    <a
                        className='ahome'
                        href='https://codesandbox.io/s/github/tanstack/query/tree/main/examples/react/auto-refetching?from-embed=&file=/pages/index.js'
                        target='_blank'
                    >
                        Auto Refetching
                    </a>
                    <br />
                </div>
            </div>
        </div>
    );
};
