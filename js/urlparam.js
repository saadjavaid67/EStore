if (urlParams.has('department')) {
    if (departmentParam == 'grocery') {
        genre.selectedIndex = '0';
        if (urlParams.has('catagory')) {
            if (catagoryParam.includes('%20')) {
                catagoryParam.replace('%20', ' ')
            }
            if (catagoryParam == 'air fresheners') {
                grocerySelector.selectedIndex = '1';
            } else if (catagoryParam == 'baby products') {
                grocerySelector.selectedIndex = '2';
            } else if (catagoryParam == 'biscuits') {
                grocerySelector.selectedIndex = '3';
            } else if (catagoryParam == 'chocolates') {
                grocerySelector.selectedIndex = '4';
            } else if (catagoryParam == 'cooking oil') {
                grocerySelector.selectedIndex = '5';
            } else if (catagoryParam == 'dairy products') {
                grocerySelector.selectedIndex = '6';
            } else if (catagoryParam == 'dental care') {
                grocerySelector.selectedIndex = '7';
            } else if (catagoryParam == 'drinks') {
                grocerySelector.selectedIndex = '8';
            } else if (catagoryParam == 'frozen food') {
                grocerySelector.selectedIndex = '9';
            } else if (catagoryParam == 'household') {
                grocerySelector.selectedIndex = '10';
            } else if (catagoryParam == 'jam and spreads') {
                grocerySelector.selectedIndex = '11';
            } else if (catagoryParam == 'kitchen') {
                grocerySelector.selectedIndex = '12';
            } else if (catagoryParam == 'makeup') {
                grocerySelector.selectedIndex = '13';
            } else if (catagoryParam == 'men') {
                grocerySelector.selectedIndex = '14';
            } else if (catagoryParam == 'pasta and noodles') {
                grocerySelector.selectedIndex = '15';
            } else if (catagoryParam == 'pet food') {
                grocerySelector.selectedIndex = '16';
            } else if (catagoryParam == 'pulses and grains') {
                grocerySelector.selectedIndex = '17';
            } else if (catagoryParam == 'rice and flour') {
                grocerySelector.selectedIndex = '18';
            } else if (catagoryParam == 'sauces') {
                grocerySelector.selectedIndex = '19';
            } else if (catagoryParam == 'shampoo') {
                grocerySelector.selectedIndex = '20';
            } else if (catagoryParam == 'spices and masalas') {
                grocerySelector.selectedIndex = '21';
            } else if (catagoryParam == 'skin care') {
                grocerySelector.selectedIndex = '22';
            } else if (catagoryParam == 'soaps and detergents') {
                grocerySelector.selectedIndex = '23';
            } else if (catagoryParam == 'tea and coffee') {
                grocerySelector.selectedIndex = '24';
            } else if (catagoryParam == 'tissues') {
                grocerySelector.selectedIndex = '25';
            }
        }
    } else if (departmentParam == 'fruit') {
        genre.selectedIndex = '1';

    } else if (departmentParam == 'vegetable') {
        genre.selectedIndex = '2';

    }
}