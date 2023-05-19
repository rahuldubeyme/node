jQuery(document).ready(function() {

    //const usersDatatable = $("#users-datatable");


    var usersdataTable =  jQuery("#users-datatable").DataTable({
    
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: [-1],
            },
        ],
        aoColumnDefs: [{
            bSortable: false,
            aTargets: [-1],
        }],
        stateSave: true,
        searchDelay: 700,
        aaSorting: [
            [0, 'desc'],
        ],
        processing: true,
        serverSide: true,
        ajax: {
            url: '/users/list',
            data: {},
        },
        initComplete: (settings, json) => {
            console.log('json==>>',json, settings)
            $('.tableLoader').css('display', 'none');
        },
        language: {
            paginate: {
                previous: '<i class="mdi mdi-chevron-left">',
                next: '<i class="mdi mdi-chevron-right">',
            },
        },
        drawCallback: () => {
            $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
        },
    });
  });





/* $(document).ready(() => {

    console.log('=======>>',usersDatatable )

usersdataTable.draw();


}); */