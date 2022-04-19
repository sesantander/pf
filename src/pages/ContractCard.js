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

export default function ContractCard({ type }) {
  const { title, image, description } = type;

  return (
    <Card style={{ width: '20vw' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={title} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        {description}
      </Stack>
    </Card>
  );
}
