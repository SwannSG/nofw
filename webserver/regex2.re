n or nn but not nnn....
^([0-9]{1,2})$

n/ or nn/ but not nnn.../
^([0-9]{1,2})?\/$

n/n or nn/n or n/nn or nn/nn
^([0-9]{1,2})?\/([0-9]{1,2})$

n/n/ or nn/n/ or n/nn/ or nn/nn/
^([0-9]{1,2})?\/([0-9]{1,2})?\/$

n/n/n...  or nn/n/n... or n/nn/n... or nn/nn/n...
^([0-9]{1,2})?\/([0-9]{1,2})?\/([0-9]{1,4})$

n/n/nnnn  or nn/n/nnnn or n/nn/nnnn or nn/nn/nnnn
^([0-9]{1,2})?\/([0-9]{1,2})?\/([0-9]{4})$

Check valid day, month, year seperately



if ((m = re.exec(str)) !== null) {
    if (m.index === re.lastIndex) {
        re.lastIndex++;
    }
    // View your result using the m-variable.
    // eg m[0] etc.
}
