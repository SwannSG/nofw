/**
 * Created by swannsg on 2015/04/23.
 */
// usage in html
//<div class="form-group">
//<label for="amount" class="col-sm-2 control-label">Amount</label>
//<div class="col-sm-10">
//<input type="text" class="form-control" id="finAmount" title="Amount including VAT" required pattern="\d+(.\d{0,2})?">
//</div>
//</div>
jQuery(function($) {
    $('.finance-format').autoNumeric('init');
});

//    auto complete using '.' - injects current year
jQuery(function($) {
    $(".auto-year").on('keyup', function (evt) {
        console.log('keyup');
        if ((evt.which == 190 ) | (evt.which == 110 )) { // '+' for auto complete year
            $(this).val($(this).val().slice(0, -1).concat((new Date).getFullYear().toString()));
        }
    });
});

