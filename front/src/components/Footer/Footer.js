import React from 'react'
import A from "../../components/A"

const Footer = (props) => {
    return(
        <>
            <div id="footer">
                <div className="footer-top-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="footer-rows-container">
                                    <div className="footer-rows-left">
                                        <div className="footer-row">
                                            <div className="footer-row-inner footer-logo">
                                                <img src="images/logo2.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-middle-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-md-3">
                                <div className="footer-links">
                                    <h3>Pour les candidats</h3>
                                    <ul>
                                        <li><A><span>Parcourir les emplois</span></A></li>
                                        <li><A><span>Ajouter un CV</span></A></li>
                                        <li><A><span>Alertes d'emploi</span></A></li>
                                        <li><A><span>Mes marque-pages</span></A></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3">
                                <div className="footer-links">
                                    <h3>Pour les employeurs</h3>
                                    <ul>
                                        <li><A><span>Parcourir les candidats</span></A></li>
                                        <li><A><span>Publier une offre</span></A></li>
                                        <li><A><span>Publier un travail</span></A></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3">
                                <div className="footer-links">
                                    <h3>Liens utiles</h3>
                                    <ul>
                                        <li><A><span>Politique de confidentialité</span></A></li>
                                        <li><A><span>Conditions d'utilisation</span></A></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-3">
                                <div className="footer-links">
                                    <h3>Compte</h3>
                                    <ul>
                                        <li><A><span>S'identifier</span></A></li>
                                        <li><A><span>Mon compte</span></A></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12">
                                <h3><i className="icon-feather-mail" /> Inscrivez-vous à une newsletter </h3>
                                 <p> Dernières nouvelles hebdomadaires, analyses et conseils de pointe sur la recherche d'emploi.</p>
                                <form action="#" method="get" className="newsletter">
                                    <input type="text" name="fname" placeholder="Entrez votre adresse email" />
                                    <button type="submit"><i className="icon-feather-arrow-right" /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                © 2020 <strong>URH</strong>. Tous les droits sont réservés.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer
