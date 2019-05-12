import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import Listing from './Listing';
import Add from './Add';
import Edit from './Edit';

export default class Index extends Component {
    componentDidMount(){
            //An array of assets
    let scripts = [
        { src: "/matrix/assets/extra-libs/multicheck/datatable-checkbox-init.js" },
        { src: "/matrix/assets/extra-libs/multicheck/jquery.multicheck.js" },
        { src: "/matrix/assets/extra-libs/DataTables/datatables.min.js" },
        { src: "/matrix/assets/libs/inputmask/dist/min/jquery.inputmask.bundle.min.js" },
        { src: "/matrix/dist/js/pages/mask/mask.init.js" },
        { src: "/matrix/assets/libs/select2/dist/js/select2.full.min.js" },
        { src: "/matrix/assets/libs/select2/dist/js/select2.min.js" },
        { src: "/matrix/assets/libs/jquery-asColor/dist/jquery-asColor.min.js" },
        { src: "/matrix/assets/libs/jquery-asGradient/dist/jquery-asGradient.js" },
        { src: "/matrix/assets/libs/jquery-asColorPicker/dist/jquery-asColorPicker.min.js" },
        { src: "/matrix/assets/libs/jquery-minicolors/jquery.minicolors.min.js" },
        { src: "/matrix/assets/libs/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js" },
        { src: "/matrix/assets/libs/quill/dist/quill.min.js" },
    ]
    //Append the script element on each iteration
    scripts.map(item => { 
        const script = document.createElement("script")
        script.src = item.src
        script.async = true
        script.className = 'penduduk'
        document.body.appendChild(script)
    })
    const script2 = document.createElement("script")
        script2.innerHTML = `
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
        `
        script2.async = true
        script2.className = 'penduduk'
        document.body.appendChild(script2)
    }
    render() {
        return (
            <>
                <Route exact path="/dashboard/penduduk" component={Listing}/>
                <Route exact path="/dashboard/penduduk/add" component={Add}/>
                <Route exact path="/dashboard/penduduk/edit/:id" component={Edit}/>
            </>
        );
    }
}

