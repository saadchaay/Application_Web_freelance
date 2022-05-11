import gql from 'graphql-tag';

export const MUTATION_LOGIN = gql`
    mutation login($Username: String! $Password: String!){
        login(Username: $Username Password: $Password){ 
            _id 
            Username 
            Email
            Token
            TypeCompte
            LastLogin
        }
    }
`;
export const MUTATION_REGISTER_UTILISATEUR = gql`
    mutation register_utilisateur($Email: String! $Nom: String! $Prenom: String! $Sexe: String! $DateNaissance: String! $Username: String! $Password: String!){
        addUtilisateur(Data:{Email: $Email Nom: $Nom Prenom: $Prenom Sexe: $Sexe DateNaissance: $DateNaissance Username: $Username Password: $Password})
    }
`;

export const MUTATION_REGISTER_ENTREPRISE = gql`
    mutation register_entreprise($Email: String! $Denomination: String! $StatueJuridique: String! $DateCreation: String! $Username: String! $Password: String! ){
        addEntreprise(Data:{Email: $Email Denomination: $Denomination StatueJuridique: $StatueJuridique DateCreation: $DateCreation Username :$Username Password: $Password})
    }
`;
export const MUTATION_LOGOUT = gql`
    mutation logout{
        logout
    }
`;


export const GET_USER = gql`
    query($username: String, $id: ID) {
        getUser(username: $username, id: $id) {
            isOnline
            posts {
                _id
            }
            following {
                _id
            }
            followers {
                id
            }
            notifications {
                id
                author {
                    id
                    username
                }
                follow {
                    id
                }
                like {
                    id
                }
                comment {
                    id
                }
            }
        }
    }
`;