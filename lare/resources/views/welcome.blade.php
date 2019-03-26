<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
        <!-- <link href="/css/app.css" rel="stylesheet" type="text/css" href=""> -->
        <link href="/matrix/assets/libs/flot/css/float-chart.css" rel="stylesheet" type="text/css" href="">
            <!-- Custom CSS -->

    <link rel="stylesheet" type="text/css" href="/matrix/assets/libs/select2/dist/css/select2.min.css">
    <link rel="stylesheet" type="text/css" href="/matrix/assets/libs/jquery-minicolors/jquery.minicolors.css">
    <link rel="stylesheet" type="text/css" href="/matrix/assets/libs/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
    <link rel="stylesheet" type="text/css" href="/matrix/assets/libs/quill/dist/quill.snow.css">

    <link href="/matrix/dist/css/style.min.css" rel="stylesheet" type="text/css" href="">

    </head>
    <body>
        <div id="app">
        </div>
        <script src='/js/app.js' type="text/javascript"></script>
            <!-- All Jquery -->
        <!-- ============================================================== -->
        <script src="/matrix/assets/libs/jquery/dist/jquery.min.js"></script>
        <!-- Bootstrap tether Core JavaScript -->
        <script src="/matrix/assets/libs/popper.js/dist/umd/popper.min.js"></script>
        <script src="/matrix/assets/libs/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="/matrix/assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js"></script>
        <?php if (Request::is('dashboard/*') || Request::is('dashboard/'))
                {
                ?>
        <script src="/matrix/assets/extra-libs/sparkline/sparkline.js"></script>
        <!--Wave Effects -->
        <script src="/matrix/dist/js/waves.js"></script>
        <!--Menu sidebar -->
        <script src="/matrix/dist/js/sidebarmenu.js"></script>
        <!--Custom JavaScript -->
        <script src="/matrix/dist/js/custom.min.js"></script>
        <!--This page JavaScript -->
        <script src="/matrix/dist/js/pages/dashboards/dashboard1.js"></script>
        <!-- Charts js Files -->
        <script src="/matrix/assets/libs/flot/excanvas.js"></script>
        <script src="/matrix/assets/libs/flot/jquery.flot.js"></script>
        <script src="/matrix/assets/libs/flot/jquery.flot.pie.js"></script>
        <script src="/matrix/assets/libs/flot/jquery.flot.time.js"></script>
        <script src="/matrix/assets/libs/flot/jquery.flot.stack.js"></script>
        <script src="/matrix/assets/libs/flot/jquery.flot.crosshair.js"></script>
        <script src="/matrix/assets/libs/flot.tooltip/js/jquery.flot.tooltip.min.js"></script>
        <script src="/matrix/dist/js/pages/chart/chart-page-init.js"></script>
    <?php }?>
        <?php if (Request::is('dashboard/penduduk/*') || Request::is('dashboard/penduduk'))
                {
                ?>
        <!-- this page js -->
        <script src="/matrix/assets/extra-libs/multicheck/datatable-checkbox-init.js"></script>
        <script src="/matrix/assets/extra-libs/multicheck/jquery.multicheck.js"></script>
        <script src="/matrix/assets/extra-libs/DataTables/datatables.min.js"></script>
        <script>
            /****************************************
             *       Basic Table                   *
             ****************************************/
            $('#zero_config').DataTable();
        </script>
        <script src="/matrix/assets/libs/inputmask/dist/min/jquery.inputmask.bundle.min.js"></script>
                <script src="/matrix/dist/js/pages/mask/mask.init.js"></script>
                <script src="/matrix/assets/libs/select2/dist/js/select2.full.min.js"></script>
                <script src="/matrix/assets/libs/select2/dist/js/select2.min.js"></script>
                <script src="/matrix/assets/libs/jquery-asColor/dist/jquery-asColor.min.js"></script>
                <script src="/matrix/assets/libs/jquery-asGradient/dist/jquery-asGradient.js"></script>
                <script src="/matrix/assets/libs/jquery-asColorPicker/dist/jquery-asColorPicker.min.js"></script>
                <script src="/matrix/assets/libs/jquery-minicolors/jquery.minicolors.min.js"></script>
                <script src="/matrix/assets/libs/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
                <script src="/matrix/assets/libs/quill/dist/quill.min.js"></script>
                <script>
                    //***********************************//
                    // For select 2
                    //***********************************//
                    $(".select2").select2();

                    /*colorpicker*/
                    $('.demo').each(function() {
                    //
                    // Dear reader, it's actually very easy to initialize MiniColors. For example:
                    //
                    //  $(selector).minicolors();
                    //
                    // The way I've done it below is just for the demo, so don't get confused
                    // by it. Also, data- attributes aren't supported at this time...they're
                    // only used for this demo.
                    //
                    $(this).minicolors({
                            control: $(this).attr('data-control') || 'hue',
                            position: $(this).attr('data-position') || 'bottom left',

                            change: function(value, opacity) {
                                if (!value) return;
                                if (opacity) value += ', ' + opacity;
                                if (typeof console === 'object') {
                                    console.log(value);
                                }
                            },
                            theme: 'bootstrap'
                        });

                    });
                    /*datwpicker*/
                    jQuery('.mydatepicker').datepicker();
                    jQuery('#datepicker-autoclose').datepicker({
                        autoclose: true,
                        todayHighlight: true
                    });
                    var quill = new Quill('#editor', {
                        theme: 'snow'
                    });
                </script>
                <?php
                }else  if (Request::is('dashboard/berita/') || Request::is('dashboard/berita/*')){?>
                    <!-- This Page JS -->
    <script src="/matrix/assets/libs/inputmask/dist/min/jquery.inputmask.bundle.min.js"></script>
    <script src="/matrix/dist/js/pages/mask/mask.init.js"></script>
    <script src="/matrix/assets/libs/select2/dist/js/select2.full.min.js"></script>
    <script src="/matrix/assets/libs/select2/dist/js/select2.min.js"></script>
    <script src="/matrix/assets/libs/jquery-asColor/dist/jquery-asColor.min.js"></script>
    <script src="/matrix/assets/libs/jquery-asGradient/dist/jquery-asGradient.js"></script>
    <script src="/matrix/assets/libs/jquery-asColorPicker/dist/jquery-asColorPicker.min.js"></script>
    <script src="/matrix/assets/libs/jquery-minicolors/jquery.minicolors.min.js"></script>
    <script src="/matrix/assets/libs/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
    <script src="/matrix/assets/libs/quill/dist/quill.min.js"></script>
    <script>
        //***********************************//
        // For select 2
        //***********************************//
        $(".select2").select2();

        /*colorpicker*/
        $('.demo').each(function() {
        //
        // Dear reader, it's actually very easy to initialize MiniColors. For example:
        //
        //  $(selector).minicolors();
        //
        // The way I've done it below is just for the demo, so don't get confused
        // by it. Also, data- attributes aren't supported at this time...they're
        // only used for this demo.
        //
        $(this).minicolors({
                control: $(this).attr('data-control') || 'hue',
                position: $(this).attr('data-position') || 'bottom left',

                change: function(value, opacity) {
                    if (!value) return;
                    if (opacity) value += ', ' + opacity;
                    if (typeof console === 'object') {
                        console.log(value);
                    }
                },
                theme: 'bootstrap'
            });

        });
        /*datwpicker*/
        jQuery('.mydatepicker').datepicker();
        jQuery('#datepicker-autoclose').datepicker({
            autoclose: true,
            todayHighlight: true
        });
        var quill = new Quill('#editor', {
            theme: 'snow'
        });

    </script>
<?php }else if (Request::is('login/') || Request::is('login/*')){?>
        <!-- ============================================================== -->
    <!-- This page plugin js -->
    <!-- ============================================================== -->
    <script>

    $('[data-toggle="tooltip"]').tooltip();
    $(".preloader").fadeOut();
    // ============================================================== 
    // Login and Recover Password 
    // ============================================================== 
    $('#to-recover').on("click", function() {
        $("#loginform").slideUp();
        $("#recoverform").fadeIn();
    });
    $('#to-login').click(function(){
        
        $("#recoverform").hide();
        $("#loginform").fadeIn();
    });
    </script>
<?php } ?>
    </body>
</html>
