function insert_to_table1_log(){
  var row = `
    <tr>
      <td>` + ($("#weight").val()*1).toFixed(4) + `</td>
      <td>` + $("input[name='weight_unit']:checked").parent('label').text() + `</td>
      <td>` + ($("#mole_weight").val()*1).toFixed(4) + `</td>
      <td>` + ($("#volumn").val()*1).toFixed(4) + `</td>
      <td>` + $("input[name='volumn_unit']:checked").parent('label').text() + `</td>
      <td>` + ($("#density").val()*1).toFixed(4) + `</td>
      <td>` + $("input[name='density_unit']:checked").parent('label').text() + `</td>
    </tr>
  `
	$("#table1-log tr:first").before(row);
}

$( document ).ready(function() {
	// table 1
  $( "button#getWeight" ).on( "click", function( event ) {
  	var mole_weight = $("#mole_weight").val();
  	var volumn = $("#volumn").val() * parseFloat($('input[name=volumn_unit]:checked', '#table1').val());
  	var density = $("#density").val() * parseFloat($('input[name=density_unit]:checked', '#table1').val());
  	var unit_conversion = parseFloat($('input[name=weight_unit]:checked', '#table1').val());
  	var weight = (mole_weight*volumn*density/unit_conversion).toFixed(4);
  	$("#weight").val(weight);
		insert_to_table1_log();
	});
  $( "button#getVolumn" ).on( "click", function( event ) {
  	var mole_weight = $("#mole_weight").val();
  	var weight = $("#weight").val() * parseFloat($('input[name=weight_unit]:checked', '#table1').val());
  	var density = $("#density").val() * parseFloat($('input[name=density_unit]:checked', '#table1').val());
  	var unit_conversion = parseFloat($('input[name=volumn_unit]:checked', '#table1').val());
    var volumn = ((weight/mole_weight/density)/unit_conversion).toFixed(4);
		$("#volumn").val(volumn);
    insert_to_table1_log();
	});
  $( "button#getDensity" ).on( "click", function( event ) {
  	var mole_weight = $("#mole_weight").val();
  	var weight = $("#weight").val() * parseFloat($('input[name=weight_unit]:checked', '#table1').val());
  	var volumn = $("#volumn").val() * parseFloat($('input[name=volumn_unit]:checked', '#table1').val());
  	var unit_conversion = parseFloat($('input[name=density_unit]:checked', '#table1').val());
    var density = ((weight/mole_weight/volumn)/unit_conversion).toFixed(4);
  	$("#density").val(density);
    insert_to_table1_log();
	});

  // table 2
  $( "button#getDilution" ).on( "click", function( event ) {
    var ori_density = $("#ori_density").val() * parseFloat($('input[name=ori_density_unit]:checked', '#table2').val());
    var dilution_density = $("#dilution_density").val() * parseFloat($('input[name=dilution_density_unit]:checked', '#table2').val());
    var dilution_volumn = $("#dilution_volumn").val();
    var use_ori_density_conversion = parseFloat($('input[name=dilution_volumn_unit]:checked', '#table2').val()) / parseFloat($('input[name=use_ori_density_unit]:checked', '#table2').val());
    var diluent_conversion = parseFloat($('input[name=dilution_volumn_unit]:checked', '#table2').val()) / parseFloat($('input[name=diluent_unit]:checked', '#table2').val());
    $("#use_ori_density").val((dilution_volumn*dilution_density/ori_density)*use_ori_density_conversion);
    var dilution_ratio = ori_density / dilution_density;
    if(dilution_ratio >= 1000){
  	  // ignore stock volumn
      $("#diluent").val((dilution_volumn*diluent_conversion).toFixed(4));
    }else{
      $("#diluent").val(((dilution_volumn*(1-dilution_density/ori_density))*diluent_conversion).toFixed(4));
    }
  });

  // tabs
  $( "#tabs" ).tabs();
});

