import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../utils/formatNumber';
// components
import Label from '../components/Label';
import { ColorPreview } from '../components/color-utils';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ContractCard.propTypes = {
  type: PropTypes.object,
};

export default function ContractCard({ type,link }) {
  const { title, image, description } = type;

  return (
    <Card sx={{ mt: '10px' }} style={{ width: '20vw', minWidth: '350px', maxWidth: '350px' }}>
      <Link to={link} color="inherit" underline="hover" component={RouterLink}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <ProductImgStyle alt={title} src={image} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
          {description}
        </Stack>
      </Link>
    </Card>
  );
}
