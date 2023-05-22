$(document).ready(() => {
    const usersDatatable = $("#users-datatable");
    
    var dataTable = usersDatatable.DataTable({
        'processing' : true,
        'serverSide' : true,
        'serverMethod' : 'get',
        'ajax' : {
            'url' : '/users/list'
        },
        'aaSorting' : [],

        
        'columns' : [
            { data : 'fullName' },
            { data : 'userName' },
            { data : 'mobile' },
            { data : 'isSuspended' },
            { data : 'created' },
            { data : 'actions' }
        ]
    });






    /* var usersdataTable =  jQuery("#users-datatable").DataTable({
    
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
   
  }); */








} );