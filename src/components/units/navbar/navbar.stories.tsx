import React from 'react';
import Navbar from './navbar.comp';
import Brand from '../../../assets/header/pin.svg';
import { Box, Link, SvgIcon } from '@material-ui/core';

export default {
  title: 'Header',
};

export const defaultHeader = () => { 
    const options = [
        <Link color='textPrimary' component="button">Explore</Link>,
        <Link color='textPrimary' component="button">Feature</Link>
    ];

    return (
        <Box>
            <Navbar
            brandIcon={
                <SvgIcon component={Brand} aria-hidden={true} fontSize='large' />
            }
            title='Triplaned'
            options={options}
            />
            <Box>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum lorem et malesuada euismod. Fusce venenatis, lacus vel posuere imperdiet, ante ligula auctor nunc, et dictum nisi ipsum id mi. Nulla nec erat non nulla accumsan euismod ut sit amet sapien. Donec viverra varius viverra. Donec ante orci, mattis ac laoreet ut, tempus non turpis. Aenean ac justo non purus consectetur vestibulum sit amet eget ipsum. Proin diam leo, lacinia a auctor non, pulvinar eget tortor. Nullam volutpat augue in ipsum rutrum blandit. Phasellus ultrices risus sed porta efficitur. Donec fringilla varius est, sit amet suscipit augue imperdiet sit amet.

Nam sit amet lacus quam. Fusce auctor gravida pellentesque. Etiam cursus lacus ipsum, bibendum molestie ligula tristique ut. Curabitur ac metus ultrices, consequat erat ac, ornare leo. Suspendisse neque ex, blandit sed risus sit amet, euismod porttitor libero. Curabitur pretium, enim quis vulputate imperdiet, mauris nisi tempus velit, vel consequat turpis arcu in eros. Nulla sit amet arcu vitae lectus placerat consectetur. Nunc vestibulum eros sodales viverra ullamcorper.

Aenean at pulvinar diam, ac semper urna. Integer vel semper diam. Fusce iaculis, lorem at pellentesque consequat, tellus lectus sollicitudin ipsum, id posuere nisl enim sed turpis. Nulla suscipit mi felis. Proin sit amet velit congue erat elementum egestas eget sit amet nunc. Nulla blandit non augue ac euismod. Phasellus iaculis sagittis tempus. Duis et laoreet sapien, vel porttitor ipsum. Quisque et augue non tellus volutpat gravida. Vivamus lobortis leo sem, quis euismod nunc tincidunt eget. Mauris quis congue nibh, non volutpat nisl. Nunc a tellus ipsum. Nulla congue leo vel sapien aliquet, quis volutpat enim hendrerit. Phasellus in leo sit amet nisl maximus eleifend. Nam at viverra mi.

Quisque sapien neque, blandit malesuada orci at, tempus scelerisque risus. Mauris facilisis congue metus et ornare. Sed tempus lobortis magna eget placerat. Pellentesque placerat elit quam, sed eleifend urna auctor id. Praesent ultricies eleifend eleifend. Duis venenatis efficitur ante, vel aliquam erat. Phasellus consectetur dapibus est, sed ultricies quam hendrerit at. Aliquam molestie magna consectetur, placerat eros eu, luctus purus. Maecenas eget est justo. Integer in eros ut magna vestibulum ultricies in vel ante. Fusce facilisis erat ut ligula fringilla, non ultrices mi feugiat. Duis eget nunc luctus, convallis nunc non, maximus tellus. Fusce ullamcorper venenatis risus ac condimentum. Sed iaculis volutpat metus, vel efficitur purus ullamcorper non.

Pellentesque sed lacinia quam. Praesent aliquet elementum felis, a porta turpis. Nulla imperdiet magna eu augue feugiat vestibulum. Praesent facilisis, magna in ultricies gravida, ex diam ultricies velit, feugiat pellentesque lacus dolor at lorem. Donec bibendum dapibus eleifend. Integer eu libero nec arcu feugiat aliquet id eget sem. Duis fermentum purus elit, porta dignissim lectus ornare non. Etiam sed purus at felis pulvinar rutrum. Etiam turpis libero, feugiat consequat egestas egestas, hendrerit sit amet velit. Duis eu felis imperdiet, auctor orci nec, mollis nisi.

Aliquam sit amet lorem vitae ligula posuere congue ac id nisl. Mauris ut nisl eu sapien ullamcorper viverra. Sed vel urna ornare, ultrices velit non, cursus ipsum. Praesent pharetra nunc sit amet elit commodo venenatis. Quisque commodo sodales nunc et pharetra. In gravida, felis quis consequat faucibus, arcu purus lacinia sapien, sit amet vestibulum nunc dolor a eros. Nam ligula sem, cursus at blandit at, tempor pharetra neque. Quisque nec ante lacus. Sed sed lectus a ex convallis ullamcorper. Proin luctus augue eget sollicitudin suscipit. Cras et lorem sed arcu dignissim ultricies venenatis ac eros. Proin sem elit, faucibus vitae placerat ut, consectetur a lectus. Nulla dapibus nulla libero, non aliquet elit rutrum non. Fusce tempus dui id magna viverra convallis.

Nulla nec luctus lectus. Suspendisse cursus, erat sed porttitor sollicitudin, ligula elit molestie nunc, sit amet pretium massa ipsum id ipsum. Pellentesque rhoncus erat id enim accumsan, et consequat nisl maximus. Aenean rutrum tristique sodales. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas porttitor magna eu erat dapibus, id mattis augue hendrerit. Pellentesque nisi nibh, auctor a ligula in, ornare pellentesque nulla. Maecenas condimentum diam et tincidunt pellentesque.

Mauris sagittis accumsan ante. Phasellus maximus quis ante ut iaculis. In aliquam tellus at quam pharetra pulvinar. Fusce faucibus ipsum libero, at semper justo lobortis in. Integer finibus tristique lectus, ac gravida odio mattis in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In imperdiet purus risus, eget fermentum tellus fringilla vitae. Nullam ultrices, nulla nec efficitur tincidunt, tortor sem tristique risus, vel faucibus mauris eros ac erat. Vestibulum posuere libero ornare dolor scelerisque, ut pretium justo elementum. Aenean porttitor ultrices nulla vel elementum. Suspendisse semper, mauris ac tempor ultrices, enim nisl feugiat erat, ac cursus elit nibh nec orci. Vivamus quis imperdiet lacus. Etiam quis mi a tellus eleifend sollicitudin a sodales nibh. Nulla facilisi. Pellentesque non tellus vel quam porttitor luctus ut vel lacus.

Quisque at convallis tortor, ac consequat magna. Duis in fringilla eros. Maecenas scelerisque convallis ornare. Ut cursus risus sed risus rhoncus, sed porttitor tellus feugiat. Sed venenatis orci id tortor eleifend bibendum. Phasellus laoreet urna scelerisque urna imperdiet pellentesque. Sed fermentum, arcu id rhoncus imperdiet, nisi sem dapibus mi, a auctor odio massa ut diam. Curabitur eget convallis nibh. Morbi maximus lacinia sem at tristique.

Pellentesque sed lectus gravida, suscipit ligula quis, luctus lacus. Quisque eu enim convallis nulla accumsan posuere. Vestibulum vel euismod quam. Nunc porta nunc vel dui sodales rutrum eget quis augue. Praesent ut laoreet lectus. Mauris aliquam condimentum erat laoreet molestie. Ut rhoncus ac neque quis posuere. Pellentesque porttitor nibh quis neque mattis, ac laoreet tortor lacinia. Donec pretium dui vitae ipsum lacinia, quis tincidunt ipsum ullamcorper. Vivamus eu arcu feugiat, maximus magna sit amet, dignissim metus. Praesent sit amet venenatis est. Fusce feugiat orci ac accumsan semper. Cras sapien quam, egestas vitae quam eu, cursus efficitur arcu.

Mauris dapibus ligula fermentum dui scelerisque, at ultricies ex dictum. Aenean sed nibh ut ligula molestie feugiat et lobortis dui. Cras ac arcu eu tellus porta pharetra. Mauris enim justo, ornare a ullamcorper id, vehicula vitae nisl. Vestibulum urna metus, vulputate non nibh vel, molestie ultricies dolor. Nam volutpat, ante at fringilla volutpat, ipsum nibh convallis eros, in ornare felis turpis vel dolor. Maecenas congue suscipit libero sit amet egestas. Pellentesque laoreet, mi vulputate auctor accumsan, metus nibh lacinia arcu, id malesuada ipsum augue ut est. Aenean nec scelerisque odio. Nullam eu velit sed ipsum pulvinar aliquam vel non lectus. Vivamus at quam et eros rutrum feugiat. Praesent quam odio, accumsan et lorem sed, venenatis tincidunt est. Cras iaculis rutrum maximus. Sed odio purus, gravida ut risus a, eleifend fringilla odio.

Nulla sit amet ornare enim, vitae molestie metus. Nullam a vehicula ante. Maecenas maximus aliquam urna. Suspendisse ac vestibulum arcu. Suspendisse sed viverra lacus. Phasellus laoreet arcu consequat nisl elementum scelerisque. Vestibulum tempus tortor ut dolor cursus rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Box>
        </Box>
    )
}
