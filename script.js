/**     Dev by André "RedbeaR" LECLERCQ         */
/**     25/05/2018 - @ l'IDEM Ecole Numérique   */
/**     Comments in french // Have Fun          */


// DOM Loaded
$( function () {


                //---------------------------- /
                // --- Variables générales --- /
                //---------------------------- /

    var
        //** Textes lang: FR-fr */
        text_FRfr = {
            addnew: 'Ajouter une note',
            addtitle: 'Saisir le titre...',
            adddesc: 'Saisir la description...',
            edit: 'Editer la note'
        },
        //** Balise de création de la page HTML */
        // Balise classique
        $main = $( '<main>' ),
        $ul = $( '<ul>' ),
        $h2 = $( '<h2>' ),
        $p = $( '<p>' ),
        $this,

        // DIVs
        $list = $( '<div class="list">' ),
        $add_note = $( '<div class="cursor-pointer shadow-text-dyn-md add-note">' ),
        $add_del_all = $( '<div class="cursor-pointer shadow-text-dyn-md del-all">' ),
        $sorting = $( '<div class="cursor-pointer shadow-text-dyn-md sorting">'),

        // Buttons
        $btn_add = $( '<i class="fas fa-plus-circle"></i>' ),
        $btn_close = $( '<button class="cursor-pointer shadow-text-dyn-md btn-round btn-close"><i class="far fa-times-circle"></i></button>' ),
        $btn_important = $( '<i class="shadow-text-dyn-md cursor-pointer fas fa-exclamation-circle"></i>' ),
        $btn_validate = $( '<i class="btn-validate shadow-text-dyn-md cursor-pointer far fa-check-circle"></i>' ),
        $btn_del_all = $( '<i class="shadow-text-dyn-md cursor-pointer far fa-trash-alt"></i>' ),
        $btn_sorting = $( '<i class="shadow-text-dyn-md cursor-pointer fas fa-sort-amount-up"></i>' ),

        // Inputs
        $input = $( '<input class="shadow-box-stat-md" type="text" placeholder="">' ),
        $textarea = $( '<textarea class="shadow-box-stat-md" rows="8" placeholder=""></textarea>' ),

        // Modal
        $modal_overlay = $( '<div class="hidden modal-overlay">' ),
        $modal_box = $( '<div class="shadow-box-stat-md modal-box">' ),
        $modal_title = $( '<h2 class="modal-title">' ),
        $modal_body = $( '<div class="modal-body">' ),
        $modal_footer = $( '<div class="modal-footer">' );



                // ----------------------- /
                // --- Génération HTML --- /
                // ----------------------- /

    
    //** Génération du div list */
    $list.append( $ul );
    

    //** Génération du bouton d'ajout de note */
    $add_note.append( $btn_add );

    //** Génération du bouton de suppression de toutes les notes */
    $add_del_all.append( $btn_del_all );

    //** Génération du bouton de tri */
    $sorting.append( $btn_sorting );
    
    /** Génération de la modal */
    // Ajout des textes de la modale
    $modal_title.text( text_FRfr.addnew );
    $input.attr( 'placeholder', text_FRfr.addtitle );
    $textarea.attr( 'placeholder', text_FRfr.adddesc );

    // Génération du body
    $modal_body.append( $input, $textarea );

    // Génération du footer
    $modal_footer.append( $btn_important, $btn_validate );

    // Génération de la box
    $modal_box.append( $modal_title, $btn_close, $modal_body, $modal_footer );

    // Génération de la modale complète
    $modal_overlay.append( $modal_box );


    /** Génération de la page */
    // Génération du main
    $main.append( $list, $sorting, $add_del_all, $add_note, $modal_overlay );

    // Envoi dans le body
    $( 'body' ).append( $main );



                // ------------------------------------ /
                // --- Afficher / Masquer la Modale --- /
                // ------------------------------------ /


    /** Déclaration de la fonction Reset Modal */
    var resetModal = function() {
        // On vide le champ input
        $input.val('');
        // On vide le champ area
        $textarea.val('');
        // On reset le bouton Important
        $btn_important.removeClass( 'btn-highlight' );
        // On supprime la classe bounce-in sur la box
        $modal_box.removeClass( 'bounce-in' );
        // On masque la modal
        $modal_overlay.addClass( 'hidden' );
        

    };

    /** Afficher la modale ajouter nouvelle note */
    // Au click sur le bouton ADD on ouvre la modale
    $btn_add.on( 'click', function () {
        // Ajout des textes de la modale
        $modal_title.text( text_FRfr.addnew );
        $input.attr( 'placeholder', text_FRfr.addtitle );
        $textarea.attr( 'placeholder', text_FRfr.adddesc );
        // On supprime la classe bounce-out sur la box
        $modal_box.removeClass( 'bounce-out' );
        // On affiche la modale
        $modal_overlay.removeClass( 'hidden' );
        // On ajoute la classe bounce sur la box
        $modal_box.addClass( 'bounce-in' );

    });

    /** Masquer la modale ajouter nouvelle note */
    // Au click sur l'overlay
    $modal_overlay.on( 'click', function() {

        // Si la cible est autre chose que l'overlay ou le close on ignore le click
        if( $(event.target ).is( '.modal-overlay' ) === false ) { 
            return; 
        }
        // Reset de la modal
        resetModal();
    });

    // Au click sur le bouton close
    $btn_close.on( 'click', function() {
        // Reset de la modal
        resetModal();
    });


                // ----------------------------------- /
                // --- Création d'un nouvelle note --- /
                // ----------------------------------- /

    // TODO : Vérification de la présence de text dans le input (au minimum)


    /** Activer / Désactiver le flag IMPORTANT */
    $btn_important.on( 'click', function() {

        // Si le bouton a la classe btn-highlight => supprimer la classe
        if( $btn_important.hasClass( 'btn-highlight' ) ) {
            $btn_important.removeClass( 'btn-highlight' );
        } 
        // Sinon ajouter la classe btn-highlight
        else {
            $btn_important.addClass( 'btn-highlight' );
        }
    });

    
    checkImportant = function( cible ) {
        if( $btn_important.hasClass( 'btn-highlight' ) ){
            // Modification du style de la note
            cible.addClass( 'element-highlight' );
            // Modification du style du titre
            $h2.text( '‼ ' + $input.val() + ' ‼');
        } else {
            cible.removeClass( 'element-highlight' );
        }
    };

    /** Génération de la LI au click du bouton validate */
    $btn_validate.on( 'click', function( event ) {

        // Création des éléments HTML
        var
            $li = $( '<li class="cursor-default shadow-box-md shadow-text-stat-md bounce-in element">' ),  
            $h2 = $ ( '<h2>' ),
            $p = $ ( '<p>' ),
            $title_important = $( '<i class="fas fa-exclamation-circle"></i>' ),
            $btn_delete = $( '<button class="cursor-pointer shadow-text-dyn-md btn-round btn-delete"><i class="fas fa-minus"></i></button>' );
            

        /** Suppression de la note */
        // Suppression de la note via le bouton delete de la note
        $btn_delete.on( 'click', function() {
            // On ajoute la class Bounce Out
            $li.addClass( 'bounce-out' );
            //On lance le timer
            setTimeout( function() {
                // Suppression du li concerné
                $li.remove();   
            }, 180 );
        });

        event.preventDefault();
        // Récupération du titre
        $h2.text( $input.val() );
    
        // Récupération de la description
        $p.text( $textarea.val() );

        /** Edition de la note */
        // Au click sur la note
        $li.on( 'click', function( event ) {
            // Si la cible est autre chose que le LI on ignore le click
            if( $( event.target ).is( 'i' ) === true) { 
                return; 
            }
            $this = $(this);
            // Vérification du flag important
            if( $this.hasClass( 'element-highlight' ) ){
            // Modification du style de la note
            $btn_important.addClass( 'btn-highlight' );
            }
            // Ajout des textes de la modale
            $modal_title.text( text_FRfr.edit );
            // Récupère le titre
            $input.val( $this.find( 'h2' ).text() );
            // Récupère le texte
            $textarea.val( $this.find( 'p' ).text() );
            // On affiche la modale
            $modal_overlay.removeClass( 'hidden' );

        });


        /** Création de la note */
        // Vérification du flag important
        checkImportant( $li );
    

        /** Vérification EDIT ou CREATE */
        // Si le titre de la modale est en mode edit on modifie le LI
        if( $modal_title.text() == text_FRfr.edit) {
            $this.empty().append( $h2, $btn_delete, $p );

            checkImportant( $this );
            
        } else {
        // Assemblage du LI
        $li.append( $h2, $btn_delete, $p );

        // Envoi dans le UL
        $ul.append( $li );
        }
        // Reset de la modal
        resetModal();

        // Suppression de toutes les notes au click sur la corbeil
        $btn_del_all.on( 'click', function() {
            // Suppression de tous les enfants de LI
            $ul.children().remove();
        });   

    });

                // -------------------------------------- /
                // --- Tri de la liste par importance --- /
                // -------------------------------------- /

    // Au click sur le bouton de tri => Triage de la liste
    $btn_sorting.on( 'click', function( event ){

        // Récupération des li et lancement de la fonction de tri
        var li = $('ul').find('li').sort(sorting);

        // Fonction pour trier, récupération des li en fonction de leur class
        function sorting(a, b) {
            return a.className < b.className;
        }
        // Envoi dans le LU de la nouvelle liste triée
        $('ul').append(li);

    });


});